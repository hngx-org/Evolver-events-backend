import db from '../config/db.js';
import { DataTypes } from 'sequelize'

const User = db.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// await User.sync();

export default User;
