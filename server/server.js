import db from './config/database.js';
//Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
//Models
import Niveles from './models/Niveles.js';
//Utils & Routes
import crearNiveles from './utils/CrearNiveles.js';
import crearniveles  from './routes/crearNiveles.js'; 
import loadMenu from './routes/loadMenu.js';
import loadLevel from './routes/loadLevel.js';
import loadUserProgress from './routes/loadUserProgress.js';
//Set env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
//Start app
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
//Set routes
app.use('/', crearniveles );
app.use('/api', loadMenu );
app.use('/api', loadLevel );
app.use('/api', loadUserProgress );
//Sync DB
db.sync()
  .then(async () => {
    console.log('Conexión a la base de datos establecida correctamente.');
    const nivelesExistentes = await Niveles.findAll();
    if (nivelesExistentes.length === 0) {
      console.log('No se encontraron niveles, creando niveles...');
      crearNiveles();
    } else {
      console.log('Niveles ya existen en la base de datos.');
    }
  })
  .catch(error => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});