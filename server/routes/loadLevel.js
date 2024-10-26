import express from 'express';
import Niveles from '../models/Niveles.js';

const router = express.Router()

router.get('/nivel', async (req, res) => {
    try {
      const { nivel } = req.query;
      if (!nivel) {
        return res.status(400).json({ error: 'Nivel no proporcionado' });
      }
      const nivelData = await Niveles.findOne({
        where: {nivel: nivel}
      });
      if (nivelData) {
        res.status(200).json({ Nivel: nivelData });
      } else {
        res.status(404).json({ error: 'No se encontró el nivel' });
      }    
    } catch (error) {
      console.error('Error al cargar el nivel:', error);
      }
});

export default router