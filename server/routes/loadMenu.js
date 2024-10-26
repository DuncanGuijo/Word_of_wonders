import express from 'express';
import Users_Progress from '../models/Users_Progress.js';

const router = express.Router()

router.get('/menu', async (req, res) => {
    try {
      const { userId } = req.query;
      if(!userId) return
      const nivel = await Users_Progress.findOne({
        where: {id_user: userId}
      });
      if (nivel) {
        res.status(200).json({ Nivel: nivel.Nivel });
      } else {
        res.status(404).json({ error: 'No se encontró el progreso del usuario' });
      }    
    } catch (error) {
      console.error('Error al cargar el nivel:', error);
      }
});

export default router