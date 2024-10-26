import express from 'express';
import Niveles from '../models/Niveles.js';

const router = express.Router()

router.post('/niveles', async (req, res) => {
    try {
      const { nivel, tablero, letras, total_palabras, palabras, palabras_coordenadas } = req.body;
      const nuevoTablero = await Niveles.create({ nivel, tablero, letras, total_palabras, palabras, palabras_coordenadas });
      res.status(201).json(nuevoTablero);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el tablero' });
    }
});

export default router