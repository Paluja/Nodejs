// importamos express
const express = require('express');
// importamos el archivo bbdd.js
const { USERS_BBDD } = require ("../bbdd.js");
// Creamos un router
const accountRouter = express.Router();

// Middleware. Se ejecutará siempre antes del endpoint al que se llama
accountRouter.use((req, res, next) => {
    //Aquí le pasaremos la función que vamos a ejecutar
    console.log("Se ejecuta nuestra función definida en el middleware de account");
    // Continuamos con la siguiente función
    next();
    });
    
// Obtener los detalles de una cuenta a partir del guid
accountRouter.get('/:guid', (req, res) => {  // http://localhost:3000/account/b1ea2731-750f-4c6b-8406-f9c0560eff1e
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const { guid } = req.params;
    const user = USERS_BBDD.find(user => user.guid === guid);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send('La cuenta no existe');
    // Si existe respondemos con los detalles de la cuenta
    return res.send(user);
    });
// Crear una nueva cuenta
accountRouter.post('/', (req, res) => {
    // Extraemos el guid y nombre del body. Obligamos que estén los dos campos para crear un usuario
    const { guid, name } = req.body;
    // const guid = req.body.guid
    // const name = req.body.name

    // Si no existe guid o name recibidos por el body devolvemos un 400 (bad request)
    if (!guid || !name) return res.status(400).send('Error en el body');
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid);
    // Si existe el usuario respondemos con un 409 (conflict),
    // ya que no se puede crear una cuenta nueva con el mismo guid
    if (user) return res.status(409).send('La cuenta ya existe');
    // Creamos un objeto nuevo con los datos recibidos con el método push
    USERS_BBDD.push({
    guid, name
    });
    // Enviamos una respuesta 201 Created
    return res.sendStatus(201);
    });
// Actualizar el nombre de una cuenta
accountRouter.patch('/:guid', (req, res) => {
    // Extraemos el guid de params
    const { guid } = req.params;
    // Extraemos el nombre del body
    const { name } = req.body;
    // Si no existe name devolvemos un 400 (bad request)
    if (!name) return res.sendStatus(400);
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send('La cuenta no existe');
    // Añadimos el nombre modificado y enviamos la respuesta
    user.name = name;
    return res.send(user);
    });
// Eliminar una cuenta
accountRouter.delete('/:guid', (req, res) => {
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const { guid } = req.params;
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);
    // Si no encuentra el guid (retorna -1 si no existe) respondemos con un 404
    if (userIndex === -1) return res.status(404).send('La cuenta no existe');
    // Eliminamos el índice de ese usuario del array
    USERS_BBDD.splice(userIndex, 1);
    // Enviamos simplemente un 200 OK
    return res.sendStatus(200);   // USERS_BBDD= [user1, user2, ....]
    });


// Exportamos el router definido en accountRouter.js
module.exports = accountRouter;