// back-end/config/database.js

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todo', 'postgres', '5139', {
  host: 'localhost',
  dialect: 'postgres',
  
});

export default sequelize;
