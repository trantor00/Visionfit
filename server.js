require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// ⚡ IMPORTANTE para Render
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Conexión MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error(err));

// Rutas
app.use('/api/users', require('./routes/userRoutes'));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor VisionFit corriendo en puerto ${PORT}`);
});