// importamos el módulo express
const express = require("express");
// importamos dotenv
const dotenv = require("dotenv");
// importamos accountRouter
const accountRouter = require("./routes/accountRouter");
// Añadimos el método config de dotenv
dotenv.config();
// Definimos el puerto y utilizamos las variables de entorno
const PORT = process.env.PORT;
const app = express();
// middlewares para interpretar el formato json y text enviados desde el cliente por http
app.use(express.json());
app.use(express.text());
// middleware que hemos importado del router accountRouter
app.use("/account", accountRouter); // De esta forma, en /account se ejecutará el middleware accountRouter


// Levantamos el servidor en el puerto 3000
app.listen(PORT, () =>
console.log(`Server in port ${PORT}`)
);