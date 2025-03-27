// Job Website Monitor - Tracks changes on job listings using Puppeteer

import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { diffWords } from 'diff';
import dotenv from 'dotenv';
import { config } from './config.js';

// Load environment variables
dotenv.config();

// Create MD5 hash of content for comparison
function createMD5Hash(content) {
  return createHash('md5').update(content).digest('hex');
}

// Fetch content from a webpage using Puppeteer
async function fetchPageContent(site, browser) {
  let page = null;
  
  try {
    page = await browser.newPage();
    
    // Set user agent to appear like a normal browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36');

    // Navigate to URL
    await page.goto(site.url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForSelector(site.selector, { timeout: 10000 });
    
    // Wait for dynamic content to render
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Extract content
    const content = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : null;
    }, site.selector);
    
    if (content) {
      console.log(`Found content (${content.length} chars) from ${site.name}`);
    } else {
      console.log(`No content found for ${site.name}`);
    }
    
    return content;

  } catch (error) {
    console.error(`Error fetching ${site.name}:`, error.message);
    return null;

  } finally {
    if (page) await page.close();
  }
}

// Check for changes on a site
async function checkSiteForChanges(site, browser) {
  // Ensure storage directory exists
  await fs.mkdir(config.paths.snapshots, { recursive: true });
  
  // Create filename using URL hash
  const urlHash = createMD5Hash(site.url);
  const filePath = path.join(config.paths.snapshots, `${urlHash}.json`);
  
  // Fetch current content
  const currentContent = await fetchPageContent(site, browser);
  
  if (!currentContent) {
    console.log(`Could not fetch content for ${site.name}`);
    return { status: 'ERROR', site };
  }
  
  const currentHash = createMD5Hash(currentContent);
  
  try {
    // Read previous snapshot
    const fileData = await fs.readFile(filePath, 'utf8');
    const previousSnapshot = JSON.parse(fileData);
    
    // Compare hashes
    if (previousSnapshot.contentHash !== currentHash) {
      console.log(`✓ CHANGED: ${site.name}`);
      
      // Save new snapshot
      const newSnapshot = {
        url: site.url,
        contentHash: currentHash,
        content: currentContent,
        timestamp: new Date().toISOString(),
        previousTimestamp: previousSnapshot.timestamp
      };
      
      await fs.writeFile(filePath, JSON.stringify(newSnapshot, null, 2));
      
      // Log changes
      await logContentChanges(site, previousSnapshot.timestamp, previousSnapshot.content, currentContent);
      return { status: 'CHANGED', site };
    }
    
    console.log(`✓ UNCHANGED: ${site.name}`);
    return { status: 'UNCHANGED', site };
    
  } catch (error) {
    // First time checking this URL or other error
    if (error.code === 'ENOENT') {
      console.log(`✓ FIRST CHECK: ${site.name}`);
      
      // Save initial snapshot
      const initialSnapshot = {
        url: site.url,
        contentHash: currentHash,
        content: currentContent,
        timestamp: new Date().toISOString(),
        previousTimestamp: null
      };
      
      await fs.writeFile(filePath, JSON.stringify(initialSnapshot, null, 2));
      return { status: 'FIRST', site };
    } else {
      console.error(`✗ ERROR checking ${site.name}:`, error);
      return { status: 'ERROR', site, error: error.message };
    }
  }
}

// Log content changes to file
async function logContentChanges(site, previousTimestamp, oldContent, newContent) {
  await fs.mkdir(config.paths.logs, { recursive: true });
  
  const logFile = path.join(config.paths.logs, 'changes.log');
  const diffFile = path.join(config.paths.logs, `diff_${Date.now()}_${createMD5Hash(site.url).substring(0, 8)}.txt`);
  const timestamp = new Date().toISOString();
  const lastChecked = previousTimestamp ? 
    new Date(previousTimestamp).toLocaleString() : 
    'first check';
  
  // Create text diff
  let diffText = '';
  if (oldContent && newContent) {
    const differences = diffWords(oldContent, newContent);
    
    differences.forEach((part) => {
      if (part.added) {
        diffText += `\n[ADDED] ${part.value}`;
      } else if (part.removed) {
        diffText += `\n[REMOVED] ${part.value}`;
      } else {
        // For context, include a short snippet of unchanged text
        if (part.value.length > 50) {
          diffText += `\n[UNCHANGED] ${part.value.substring(0, 25)}...${part.value.substring(part.value.length - 25)}`;
        } else {
          diffText += `\n[UNCHANGED] ${part.value}`;
        }
      }
    });
  } else {
    diffText = "\nNo previous content available for comparison.";
  }
  
  const logEntry = `
=== CHANGE DETECTED ===
Time: ${timestamp}
Website: ${site.name}
URL: ${site.url}
Last checked: ${lastChecked}
Current check: ${new Date().toLocaleString()}
Diff file: ${diffFile}
=======================

`;

  try {
    await fs.appendFile(logFile, logEntry);
    await fs.writeFile(diffFile, `DIFF FOR ${site.name} (${site.url})\nTIME: ${timestamp}\n\n${diffText}`);
    console.log(`Change logged to ${logFile}`);
    console.log(`Diff saved to ${diffFile}`);
  } catch (error) {
    console.error('Error logging change:', error);
  }
}

// Log errors to file
async function logErrors(errorSites) {
  if (errorSites.length === 0) return;
  
  await fs.mkdir(config.paths.logs, { recursive: true });
  
  const logFile = path.join(config.paths.logs, 'errors.log');
  const timestamp = new Date().toISOString();
  
  let logEntry = `
=== ERRORS DETECTED ===
Time: ${timestamp}
Number of errors: ${errorSites.length}
=======================

`;

  errorSites.forEach((result, index) => {
    logEntry += `
Error ${index + 1}:
Website: ${result.site.name}
URL: ${result.site.url}
Error details: ${result.error || 'Content not found'}
-----------------------
`;
  });
  
  try {
    await fs.appendFile(logFile, logEntry);
    console.log(`Errors logged to ${logFile}`);
  } catch (error) {
    console.error('Error logging errors:', error);
  }
}

// Process sites in batches for better concurrency
async function processBatch(batch, browser) {
  console.log(`Processing batch of ${batch.length} sites...`);
  
  const promises = batch.map(site => {
    console.log(`Checking ${site.name}...`);
    return checkSiteForChanges(site, browser);
  });
  
  return Promise.all(promises);
}

// Add a delay between operations
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function main() {
  console.log(`Starting job site monitor at ${new Date().toISOString()}`);
  
  // Ensure all required directories exist
  for (const dir of Object.values(config.paths)) {
    await fs.mkdir(dir, { recursive: true });
  }
  
  const results = [];
  let browser = null;
  
  try {
    // Launch a single browser instance
    console.log('Launching browser...');
    browser = await puppeteer.launch(config.browser);
    
    // Process sites in batches
    for (let i = 0; i < config.sites.length; i += config.concurrency) {
      const batch = config.sites.slice(i, i + config.concurrency);
      
      // Process this batch
      const batchResults = await processBatch(batch, browser);
      results.push(...batchResults);
      
      // Add a small delay between batches
      if (i + config.concurrency < config.sites.length) {
        await delay(1000);
      }
    }
  } catch (error) {
    console.error('Fatal error:', error);
  } finally {
    // Always close the browser
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
  
  console.log(`\n${config.sites.length} Checks completed at ${new Date().toLocaleString()}`);
  
  // Group results by status
  const errorSites = results.filter(result => result.status === 'ERROR');
  const changedSites = results.filter(result => result.status === 'CHANGED');
  const firstSites = results.filter(result => result.status === 'FIRST');
  
  // Log errors if any
  if (errorSites.length > 0) {
    await logErrors(errorSites);
  }
  
  // Print summary
  console.log('\n=== CHECK SUMMARY ===');
  
  // Print error summary if any
  if (errorSites.length > 0) {
    console.log('\n--- ERRORS ---');
    console.log('The following sites had errors:');
    errorSites.forEach((result, index) => {
      console.log(`${index + 1}. ${result.site.name}: ${result.site.url}`);
    });
  }
  
  // Print first check summary
  if (firstSites.length > 0) {
    console.log('\n--- FIRST CHECKS ---');
    console.log('Initial snapshots created for:');
    firstSites.forEach((result, index) => {
      console.log(`${index + 1}. ${result.site.name}: ${result.site.url}`);
    });
  }
  
  // Print change summary if any
  if (changedSites.length > 0) {
    console.log('\n--- CHANGES ---');
    console.log('The following sites have changed:');
    changedSites.forEach((result, index) => {
      console.log(`${index + 1}. ${result.site.name}: ${result.site.url}`);
    });
  } else if (firstSites.length === 0) {
    console.log('\nNo changes detected in any of the monitored sites.');
  }
  
  console.log('=====================');
}

// Run the monitor and handle any fatal errors
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});