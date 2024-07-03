// importamos el módulo express
const express = require("express");
// importamos dotenv
const dotenv = require("dotenv");
// importamos Morgan (middleware de peticiones HTTP para node.js)
const logger = require("morgan");
// Importamos cookie-parser en nuestro archivo index.js
const cookieParser = require('cookie-parser');

// importamos accountRouter
const accountRouter = require("./routes/accountRouter");
// importamos productsRouter
// const productsRouter = require("./routes/productsRouter");
// importamos authRouter
const authRouter = require("./routes/authRouter");

// importamos authSessionRouter
const authSessionRouter = require("./routes/authSessionRouter");
// importamos authTokenRouter
const authTokenRouter = require("./routes/authTokenRouter");

// Añadimos el método config de dotenv
dotenv.config();
// Definimos el puerto y utilizamos las variables de entorno
const PORT = process.env.PORT;
const app = express();
// middlewares para interpretar el formato json y text enviados desde el cliente por http
app.use(express.json());
app.use(express.text());

// middleware de peticiones HTTP para node.js (Morgan)
app.use(logger('dev'));
// Añadimos cookie-parser a la aplicación Express
app.use(cookieParser());

// middleware que hemos importado del router accountRouter
app.use("/account", accountRouter); // De esta forma, en /account se ejecutará el middleware accountRouter
// app.use("/products", productsRouter);
// middleware que hemos importado del router authRouter
app.use("/auth", authRouter);

// middleware para authSessionRouter
app.use("/auth-session", authSessionRouter)
// middleware para authTokenRouter
app.use("/auth-token", authTokenRouter);

// Añadimos un endpoint para ver el funcionamiento de Router y su middleware
// app.get('/users', (req, res) => {
//     res.send('Endpoint fuera de account, no se ejecutaría el middleware de accountRouter')
// })

// Levantamos el servidor en el puerto 3000
app.listen(PORT, () =>
console.log(`Server in port ${PORT}`)
);