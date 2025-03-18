// Basic Node.js app to monitor webpage changes

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const diff = require('diff');
require('dotenv').config();

// Configuration
const config = {
  urls: [
    // { 
    //   url: 'http://localhost:3000', 
    //   selector: '#main-content', // CSS selector to target specific content
    //   name: 'Local Test Page'
    // },
    { 
      url: 'https://news.ycombinator.com/', 
      selector: '.itemlist', // Monitor the main stories list
      name: 'Hacker News'
    },
    { 
      url: 'https://example.com', 
      selector: 'body', // Simple website that rarely changes
      name: 'Example.com'
    },
    { 
      url: 'https://httpbin.org/html', 
      selector: 'body', // Simple static HTML page
      name: 'HTTPBin HTML'
    }
  ],
  checkInterval: process.env.CHECK_INTERVAL || '*/1 * * * *', // Use env variable or default to every 5 minutes
  storageDir: process.env.STORAGE_DIR || './snapshots',
  notifications: {
    email: {
      enabled: process.env.EMAIL_ENABLED === 'true',
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      recipient: process.env.EMAIL_RECIPIENT
    }
  }
};

// Create hash of content for comparison
function hashContent(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

// Fetch webpage content
async function fetchPage(pageConfig) {
  try {
    const response = await axios.get(pageConfig.url);
    const $ = cheerio.load(response.data);
    
    // Extract content based on selector or use entire body
    const content = pageConfig.selector ? 
      $(pageConfig.selector).text().trim() : 
      $('body').text().trim();
    
    return content;
  } catch (error) {
    console.error(`Error fetching ${pageConfig.url}:`, error.message);
    return null;
  }
}

// Check for changes
async function checkForChanges(pageConfig) {
  // Ensure storage directory exists
  await fs.mkdir(config.storageDir, { recursive: true });
  
  // Create filename based on URL
  const urlHash = hashContent(pageConfig.url);
  const filePath = path.join(config.storageDir, `${urlHash}.json`);
  
  // Fetch current content
  const currentContent = await fetchPage(pageConfig);
  if (!currentContent) return;
  
  const currentHash = hashContent(currentContent);
  
  try {
    // Try to read previous snapshot
    const fileData = await fs.readFile(filePath, 'utf8');
    const previousSnapshot = JSON.parse(fileData);
    
    // Compare hashes
    if (previousSnapshot.contentHash !== currentHash) {
      console.log(`Change detected on ${pageConfig.name} (${pageConfig.url})`);
      
      // Save new snapshot
      const newSnapshot = {
        url: pageConfig.url,
        contentHash: currentHash,
        content: currentContent,
        timestamp: new Date().toISOString(),
        previousTimestamp: previousSnapshot.timestamp
      };
      
      await fs.writeFile(filePath, JSON.stringify(newSnapshot, null, 2));
      
      // Send notification with diff
      await sendNotification(pageConfig, previousSnapshot.timestamp, previousSnapshot.content, currentContent);
      
      return true;
    }
    
    console.log(`No changes detected on ${pageConfig.name} (${pageConfig.url})`);
    return false;
    
  } catch (error) {
    // First time checking this URL or other error
    if (error.code === 'ENOENT') {
      console.log(`First check for ${pageConfig.name} (${pageConfig.url})`);
      
      // Save initial snapshot
      const initialSnapshot = {
        url: pageConfig.url,
        contentHash: currentHash,
        content: currentContent,
        timestamp: new Date().toISOString(),
        previousTimestamp: null
      };
      
      await fs.writeFile(filePath, JSON.stringify(initialSnapshot, null, 2));
    } else {
      console.error(`Error checking ${pageConfig.url}:`, error);
    }
    
    return false;
  }
}

// Send notification
async function sendNotification(pageConfig, previousTimestamp, oldContent, newContent) {
  // Log to file
  const logDir = './logs';
  await fs.mkdir(logDir, { recursive: true });
  
  const logFile = path.join(logDir, 'changes.log');
  const diffFile = path.join(logDir, `diff_${Date.now()}_${hashContent(pageConfig.url).substring(0, 8)}.txt`);
  const timestamp = new Date().toISOString();
  const lastChecked = previousTimestamp ? 
    new Date(previousTimestamp).toLocaleString() : 
    'first check';
  
  // Create diff
  let diffText = '';
  if (oldContent && newContent) {
    const differences = diff.diffWords(oldContent, newContent);
    
    differences.forEach((part) => {
      if (part.added) {
        diffText += `\n[ADDED] ${part.value}`;
      } else if (part.removed) {
        diffText += `\n[REMOVED] ${part.value}`;
      } else {
        // For context, just include a short snippet of unchanged text
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
Website: ${pageConfig.name}
URL: ${pageConfig.url}
Last checked: ${lastChecked}
Current check: ${new Date().toLocaleString()}
Diff file: ${diffFile}
=======================

`;

  try {
    // Append to log file
    await fs.appendFile(logFile, logEntry);
    // Write diff to separate file for better readability
    await fs.writeFile(diffFile, `DIFF FOR ${pageConfig.name} (${pageConfig.url})\nTIME: ${timestamp}\n\n${diffText}`);
    console.log(`Change logged to ${logFile}`);
    console.log(`Diff saved to ${diffFile}`);
    
    // Also attempt email if enabled
    if (config.notifications.email.enabled) {
      try {
        const transporter = nodemailer.createTransport({
          service: config.notifications.email.service,
          auth: config.notifications.email.auth
        });
        
        const mailOptions = {
          from: config.notifications.email.auth.user,
          to: config.notifications.email.recipient,
          subject: `Change detected on ${pageConfig.name}`,
          html: `
            <h2>Change Detected!</h2>
            <p><strong>Website:</strong> ${pageConfig.name}</p>
            <p><strong>URL:</strong> <a href="${pageConfig.url}">${pageConfig.url}</a></p>
            <p><strong>Last checked:</strong> ${lastChecked}</p>
            <p><strong>Current check:</strong> ${new Date().toLocaleString()}</p>
            <h3>Changes:</h3>
            <pre>${diffText.replace(/\[ADDED\]/g, '<span style="color: green; background-color: #e6ffe6;">[ADDED]')
                          .replace(/\[REMOVED\]/g, '<span style="color: red; background-color: #ffe6e6;">[REMOVED]')
                          .replace(/\[UNCHANGED\]/g, '<span style="color: gray;">[UNCHANGED]')
                          .replace(/\n/g, '<br>')}</pre>
            <p>Visit the website to see all changes.</p>
          `
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log(`Notification email sent: ${info.messageId}`);
      } catch (error) {
        console.error('Error sending notification email:', error);
        console.log('Continuing with file logging only');
      }
    }
  } catch (error) {
    console.error('Error logging change:', error);
  }
}

// Check all configured URLs
async function checkAllPages() {
  console.log(`Starting checks at ${new Date().toLocaleString()}`);
  
  for (const pageConfig of config.urls) {
    await checkForChanges(pageConfig);
  }
  
  console.log(`Finished checks at ${new Date().toLocaleString()}`);
}

// Run on schedule
function startMonitoring() {
  console.log(`Webpage monitor started. Checking on schedule: ${config.checkInterval}`);
  
  // Run immediately on start
  checkAllPages();
  
  // Schedule regular checks
  cron.schedule(config.checkInterval, checkAllPages);
}

// Start the application
startMonitoring();