// test-server.js - A simple Express server that serves a webpage you can easily modify
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Create the test HTML file if it doesn't exist
const testHtmlPath = path.join(__dirname, 'test-page.html');
if (!fs.existsSync(testHtmlPath)) {
  const initialHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Page for Change Detection</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    .content { padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
    .timestamp { color: #666; font-size: 0.8em; margin-top: 30px; }
  </style>
</head>
<body>
  <h1>Test Page for Change Detection</h1>
  <div class="content" id="main-content">
    <p>This is version 1 of the test content.</p>
    <p>Monitor this page for changes.</p>
  </div>
  <div class="timestamp">
    Last updated: ${new Date().toLocaleString()}
  </div>
</body>
</html>
  `;
  fs.writeFileSync(testHtmlPath, initialHtml);
}

// Serve the test HTML file
app.get('/', (req, res) => {
  res.sendFile(testHtmlPath);
});

// Endpoint to modify the test page programmatically
app.get('/change-content', (req, res) => {
  const newContent = req.query.content || `Updated content - ${new Date().toLocaleString()}`;
  
  fs.readFile(testHtmlPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send(`Error reading file: ${err.message}`);
    }
    
    // Update the content div and timestamp
    const updatedHtml = data
      .replace(/<div class="content" id="main-content">[\s\S]*?<\/div>/, 
               `<div class="content" id="main-content">\n    <p>${newContent}</p>\n  </div>`)
      .replace(/<div class="timestamp">[\s\S]*?<\/div>/, 
               `<div class="timestamp">\n    Last updated: ${new Date().toLocaleString()}\n  </div>`);
    
    fs.writeFile(testHtmlPath, updatedHtml, (err) => {
      if (err) {
        return res.status(500).send(`Error writing file: ${err.message}`);
      }
      res.send(`Content updated to: "${newContent}"`);
    });
  });
});

app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
  console.log(`To change content visit: http://localhost:${port}/change-content?content=your+new+content`);
});