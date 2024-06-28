// back-end/server.js

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import sequelize from './config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
// Load Passport config
import configurePassport from './config/passport.js';
configurePassport(passport);

const app = express();


// Body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session middleware
app.use(session({
  secret: 'hasna', // Replace with a strong secret key for session encryption
  resave: false, // Prevents session from being saved back to the store if it wasn't modified during the request
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
}));

// Passport middleware
app.use(passport.initialize()); // Initializes Passport for use
app.use(passport.session()); // Integrates Passport with Express sessions

// Routes
app.use('/api/auth', authRoutes); // Route for authentication-related operations
app.use('/api/tasks', taskRoutes); // Route for task-related operations


// Connect to PostgreSQL and start the server
sequelize.sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch(err => console.log(err)); // Logs any errors that occur while connecting to the database
