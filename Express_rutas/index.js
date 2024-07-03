const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    res.status(200).send('App Express')
})

app.get('/leemosUnJSON', (req, res) => {
    res.status(200).json( {
        "nombre": "Madrid",
        "provincia": "Madrid",
        "comunidad": "Comunidad de Madrid",
        "habitantes": 3223334,
        "superficie": 604.3,
        "año_fundacion": -156,
        "temperatura_media": 15.5
      })
})

app.listen(PORT, () =>{
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})


// https://expressjs.com/es/api.html#res.json