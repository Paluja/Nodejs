const http = require('http');
const fs = require('fs');
const path = require('path');

let dataJson = require('./ciudades.json');

const Port = 1234;

const processRequest = (req, res) => { 
    // const { method, url } = req;
    const method = req.method;
    const url = req.url;

    switch (method)  {
        case 'GET':
            switch (url) {
                case '/leemosUnJSON':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
                    return res.end(JSON.stringify(dataJson)); //JSON.stringify(dataJson) para transformar el Json en un string
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    return res.end('<h1>404</h1>');
            }
        case 'POST':
            switch (url) {
                case '/agregarCiudad':
                    let body = '';

                    // escuchar el evento data (NodeJs se basa en eventos!!)
                    req.on('data', chunk => {
                        body += chunk.toString(); // cada chunk es un trozo de data que está llegando
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body);
                        dataJson.push(data);
                        fs.writeFileSync(path.join(__dirname, 'ciudades.json'), JSON.stringify(dataJson, null, 2));
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
                        res.end(JSON.stringify(data));
                    });
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    return res.end('<h1>404</h1>');
            }
            break;
        case 'PUT':
            switch (url) {
                case '/modificarCiudad':
                    let updateBody = '';

                    req.on('data', chunk => {
                        updateBody += chunk.toString();
                    });

                    req.on('end', () => {
                        const { nombre, nuevoNombre } = JSON.parse(updateBody);
                        let ciudadEncontrada = false;
                        console.log(nuevoNombre)
                        dataJson = dataJson.map(ciudad => {
                            if (ciudad.nombre === nombre) {
                                ciudad.nombre = nuevoNombre;
                                ciudadEncontrada = true;
                            }
                            return ciudad;
                        });

                        if (ciudadEncontrada) {
                            fs.writeFileSync(path.join(__dirname, 'ciudades.json'), JSON.stringify(dataJson, null, 2));
                            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                            res.end(JSON.stringify({ mensaje: 'Nombre de ciudad actualizado con éxito.' }));
                        } else {
                            res.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
                            res.end(JSON.stringify({ mensaje: 'Ciudad no encontrada.' }));
                        }
                    });
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    return res.end('<h1>404</h1>');
            }
            break;
        default:
            res.statusCode = 405;
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            return res.end('<h1>405 Method Not Allowed</h1>');
    }
};

const server = http.createServer(processRequest);

server.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}/`);
});
