// importamos express y la función para validar email y password
const express = require("express");
const checkEmailPassword = require("../utils/checkEmailPassword");
// importamos el archivo bbdd.js
const { USERS_BBDD } = require ("../bbdd.js");
const authSessionRouter = express.Router();
const { v4: uuidv4 } = require('uuid'); // importamos la libreria

const sessions = [];
authSessionRouter.post("/login", async (req, res) => {
    // Obtenemos el email y password del body
    const { email, password } = req.body;
    // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
    if (!email || !password) return res.sendStatus(400);
    try {
        // Llamamos a la función de validar el email y password
        const {guid} = await checkEmailPassword(email, password);


        // Generamos un identificador con la librería uuid
        const sessionId = uuidv4(); // => '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        
        // Añadimos el sessionId al array
        sessions.push({sessionId, guid});
        console.log(sessions)
        // Escribimos en la cookie el sessionId con la opción httpOnly(para setearla en la cabecera de vuelta al Cliente)
        res.cookie('sessionId', sessionId, {httpOnly: true})//le devolvemos la cookie al cliente

        // console.log(res.cookie('sessionId', sessionId, {httpOnly: true}))

        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send(`Usuario  autenticado `)
    } catch (err) {
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401);
    }
// Solicitud autenticada con sesión para obtener el perfil del usuario
});


// Solicitud autenticada con sesión para obtener el perfil del usuario
authSessionRouter.get("/profile", (req, res) => {
    // obtenemos la cookie que recibimos
    console.log(req.cookies)
    const { cookies } = req;
    // Si la cookie no existe enviamos un 401 (unauthorized)
    if (!cookies.sessionId) return res.sendStatus(401);
    // Buscamos la sesión recibida en el array de sesiones
    const userSession = sessions.find((session) => session.sessionId === cookies.sessionId);
    // Si no existe enviamos un 401 (unauthorized)
    if (!userSession) return res.sendStatus(401)
    // Obtenemos los datos del usuario a través de guid
    const user = USERS_BBDD.find(user => user.guid === userSession.guid);
    // Si no obtenemos usuario enviamos un 401 (unauthorized)
    if (!user) return res.sendStatus(401);
    // Borramos la password del objeto obtenido para no mostrarla
    delete user.password;
    // Y devolvemos los datos del usuario
    return res.send(user);
    });
module.exports = authSessionRouter;