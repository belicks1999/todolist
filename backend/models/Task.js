// back-end/models/Task.js

import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Task;
