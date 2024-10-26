import express from 'express';
import Users_Progress from '../models/Users_Progress.js';

const router = express.Router()

router.get('/userprogress', async (req, res) => {
    try {
      const { userId, nivel } = req.query;
      if(!userId) return
      const level = await Users_Progress.findOne({
        where: {id_user: userId}
      });
      if (level) {
        res.status(200).json({ Nivel: nivel.Nivel });
      } else {
        res.status(404).json({ error: 'No se encontró el progreso del usuario' });
      }    
    } catch (error) {
      console.error('Error al cargar el nivel:', error);
      }
});

export default router