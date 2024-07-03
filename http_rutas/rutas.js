const http = require('http');
const fs = require('fs');
const path = require('path');

// Configura el servidor HTTP
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('App HTTP');
    // } else if (req.method === 'GET' && req.url === '/leerUnJSON') {
    //     const jsonFilePath = path.join(__dirname, 'data.json');
    //     fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    //         if (err) {
    //             res.writeHead(500, { 'Content-Type': 'text/plain' });
    //             res.end('Error reading JSON file');
    //         } else {
    //             res.writeHead(200, { 'Content-Type': 'application/json' });
    //             res.end(data);
    //         }
    //     });    
    } else if (req.method === 'GET' && req.url === '/leerUnHTML') {
            const htmlFilePath = path.join(__dirname, 'archivo.html');
            fs.readFile(htmlFilePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading HTML file');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        
            
    } else if (req.method === 'GET' && req.url === '/archivo') {
        const pdfFilePath = path.join(__dirname, 'document.pdf');
        fs.readFile(pdfFilePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading PDF file');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/pdf' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// El servidor escucha en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});


// - Para la ruta principal:
//   http://localhost:3000/
// - Para leer el archivo JSON:
//   http://localhost:3000/leerUnJSON
// - Para leer el archivo PDF:
//   http://localhost:3000/archivo





