const express = require('express');
const app = express();

// Middleware para todas las rutas
app.use(express.json());

// Ruta general que coincide con cualquier cosa
app.get('*', (req, res) => {
    res.send('Catch-All Route');
  });

// Ruta específica para /user
app.get('/user', (req, res) => {
  res.send('User Route');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
