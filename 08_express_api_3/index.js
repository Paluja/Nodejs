// importamos el módulo express
const express = require("express");
// importamos dotenv
const dotenv = require("dotenv");
//importamos morgan (middleware para ver las peticiones http)
const logger = require("morgan");
// importamos accountRouter
const accountRouter = require("./routes/accountRouter");
//importamos authRouter
const authRouter=require("./routes/authRouter")
// Añadimos el método config de dotenv
dotenv.config();
// Definimos el puerto y utilizamos las variables de entorno
const PORT = process.env.PORT;
const app = express();
// middlewares para interpretar el formato json y text enviados desde el cliente por http
app.use(express.json());
app.use(express.text());
// middleware para ver las peticiones http
app.use(logger("dev"));
// middleware que hemos importado del router accountRouter
app.use("/account", accountRouter); // De esta forma, en /account se ejecutará el middleware accountRouter
//middleware que hemos ioportado del router authRouter
app.use("/auth",authRouter);

// Levantamos el servidor en el puerto 3000
app.listen(PORT, () =>
console.log(`Server in port ${PORT}`)
);