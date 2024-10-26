import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Users extends Model { }

Users.init({
  cockie_sesion: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Users',
  tableName: 'users'
});
export default Users;