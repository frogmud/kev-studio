/**
 * Simple static file server for portfolio development
 * 
 * Features:
 * - Serves static files from the portfolio directory
 * - Content type detection based on file extension
 * - Basic security headers
 * - CORS headers for development
 * - Error handling and logging
 * - Directory traversal prevention
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'portfolio');

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.js': return 'application/javascript';
    case '.css': return 'text/css';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    case '.mp4': return 'video/mp4';
    case '.pdf': return 'application/pdf';
    case '.ico': return 'image/x-icon';
    case '.md': return 'text/markdown';
    case '.txt': return 'text/plain';
    default: return 'application/octet-stream';
  }
}

// Basic security headers
function addSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'");
}

const server = http.createServer((req, res) => {
  try {
    // Prevent directory traversal
    const requestedPath = path.normalize(req.url.split('?')[0]);
    let filePath = path.join(ROOT, requestedPath);
    
    // Add CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Add security headers
    addSecurityHeaders(res);
    
    // Handle directory requests by serving index.html
    if (filePath.endsWith(path.sep)) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        console.log(`404 Not Found: ${requestedPath}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const contentType = getContentType(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      
      // Stream file with error handling
      const stream = fs.createReadStream(filePath);
      stream.on('error', (streamErr) => {
        console.error(`Error streaming file ${filePath}:`, streamErr);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      });
      
      stream.pipe(res);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Serving portfolio at http://localhost:${PORT}`);
  console.log(`Root directory: ${ROOT}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try using a different port.`);
    process.exit(1);
  }
});