// back-end/models/User.js

import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false

  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
 
});

export default User;
