import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Users_Progress extends Model { }

Users_Progress.init({
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  Nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    get() {
      const nivel = this.getDataValue('Nivel');
      return nivel;
    }
  },
  Tablero: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  Palabras_encontradas: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  Palabras_restantes: {
    type: DataTypes.JSON,
    allowNull: false,
  }
},{
  sequelize,
  modelName: 'Users_Progress',
  tableName: 'users_progress'
});

export default Users_Progress;