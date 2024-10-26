import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Niveles extends Model { }

Niveles.init({
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tablero: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  letras: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total_palabras: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  palabras: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  palabras_coordenadas: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Niveles',
  tableName: 'niveles'
});

export default Niveles;