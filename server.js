const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath;

    // Mapping URLs to HTML files
    switch (req.url) {
        case '/':
        case '/index':
            filePath = './index.html';
            break;
        case '/introduction':
            filePath = './introduction.html';
            break;
        default:
            filePath = './index.html';
    }

    // Reading the HTML file
    fs.readFile(path.join(__dirname, filePath), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

const PORT = 3000;
const IP_ADDRESS = '127.0.0.1';

server.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server running at http://${IP_ADDRESS}:${PORT}`);
});
