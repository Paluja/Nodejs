
// importamos express y la función para validar email y password
const { Router } = require("express");
const { SignJWT, jwtVerify } = require("jose");
const checkEmailPassword = require("../utils/checkEmailPassword");
const { USERS_BBDD } = require("../bbdd.js");
const validateLoginDto = require('../')
const authTokenRouter = Router();
// const { SignJWT } = require("jose");


// Login con email y password
authTokenRouter.post("/login", async (req, res) => {
    // Obtenemos el email y password del body
    const { email, password } = req.body;
    // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
    if (!email || !password) return res.sendStatus(400);
    try {
        // Validamos el email y password y obtenemos el guid
        const { guid } = await checkEmailPassword(email, password);
        // GENERAR TOKEN Y DEVOLVER TOKEN
        //Construimos el JWT con el guid
        const jwtConstructor = new SignJWT({ guid });//guid es el payload
        // Codificamos la clave secreta definida en la variable de entorno por requisito de la librería jose
        // y poder pasarla en el formato correcto (uint8Array) en el método .sign
        const encoder = new TextEncoder();
        // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa.
        // Le indicamos la cabecera, la creación, la expiración y la firma (cl ave secreta).
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: 'HS256', typ: "JWT"})//CABECERA
            .setIssuedAt()//FECHA CREACION
            .setExpirationTime('1h')//FECHA EXPIRACION
            .sign(encoder.encode(process.env.JWT_SECRET));//FIRMA( el parametro de singn no puede ser un string)
            console.log(jwt);
        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send({ jwt })
    } catch (err) {
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401);
    }
});
    
    // Solicitud autenticada con token para obtener el perfil del usuario
authTokenRouter.get("/profile", async (req, res) => {
    // OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
    const { authorization } = req.headers;
    // Si no existe el token enviamos un 401 (unauthorized)
    if (!authorization) return res.sendStatus(401);
    try {
    const token = authorization.split(' ')[1]
    // codificamos la clave secreta
    const encoder = new TextEncoder();
    // verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
    const { payload } = await jwtVerify(
        token,
                                        encoder.encode(process.env.JWT_SECRET));
        // Obtenemos los datos del usuario a través de guid
        const user = USERS_BBDD.find(user => user.guid === payload.guid);
        // Si no obtenemos usuario enviamos un 401 (unauthorized)
        if (!user) return res.sendStatus(401);
        // Borramos la password del objeto obtenido para no mostrarla
        delete user.password;
        // Y devolvemos los datos del usuario
        return res.send(user);
    } catch (err) {
// Si hay un error el token enviamos un 401 (unauthorized)
return res.sendStatus(401);
};
});

module.exports = authTokenRouter;