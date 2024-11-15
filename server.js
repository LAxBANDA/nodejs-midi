const express = require('express');
const multer = require('multer');
const { Midi } = require('@tonejs/midi');
const path = require('path');
require('dotenv').config(); // Asegúrate de instalar dotenv (npm install dotenv)

const port = process.env.PORT || 8080;

// Crear una instancia de Express
const app = express();

// Configuración de multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint para recibir y procesar el archivo MIDI
app.post('/upload-midi', upload.single('midiFile'), (req, res) => {
  console.log('test')
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const encryptedBuffer = req.file.buffer;

  try {
    // Leer el archivo MIDI con @tonejs/midi
    const midi = new Midi(encryptedBuffer);

    // Convertir el archivo MIDI a formato JSON y enviarlo en la respuesta
    res.json(midi);

  } catch (error) {
    console.error('Error procesando el archivo:', error);
    res.status(500).json({ error: 'Error procesando el archivo MIDI' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Asegúrate de que 'index.html' esté en el mismo directorio que este archivo
});


app.get('/resultado', (req, res) => {
  res.sendFile(path.join(__dirname, 'resultado.html')); // Asegúrate de que 'index.html' esté en el mismo directorio que este archivo
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});