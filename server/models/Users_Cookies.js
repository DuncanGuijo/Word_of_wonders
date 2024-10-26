import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Users_Cookies extends Model { }

Users_Cookies.init({
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Fecha_expiracion: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Users_Coockies',
  tableName: 'users_coockies'
});

export default Users_Cookies;