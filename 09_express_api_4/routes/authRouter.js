const express = require("express");
// importamos el archivo bbdd.js
const { USERS_BBDD } = require("../bbdd.js");
const authRouter = express.Router();

const checkEmailPassword = require("../utils/checkEmailPassword.js");


// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", (req, res) => res.send("Endpoint público"));// http://localhost:3000/auth/public
// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", (req, res) => {
    // Obtenemos el email y password del body
    const { email, password } = req.body;
    // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
    if (!email || !password) return res.sendStatus(400);
    try {
        // Llamamos a la función de validar el email y password
        const user = checkEmailPassword(email, password);
        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send(`Usuario ${user.name} autenticado`)
    } catch (err) {
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401);
    }
    });
    
    
// Endpoint autorizado a administradores
authRouter.post("/autorizado", (req, res) => {
    // Obtenemos el email y password del body
    const { email, password } = req.body;
    // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
    if (!email || !password) return res.sendStatus(400);
    try {
        // Llamamos a la función de validar el email y password
        const user = checkEmailPassword(email, password);
        // Si el rol del usuario no es administrador devolvemos un 403 (Forbidden)
        if (user.role !== 'admin') return res.sendStatus(403)
        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send(`Usuario administrador ${user.name}`);
    } catch (err) {
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401);
    }
    });
    
    
    
module.exports = authRouter;
