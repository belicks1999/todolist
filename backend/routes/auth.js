import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

// User signup
router.post('/signup', (req, res) => {
  const { name,email, password } = req.body;
  // Check if user already exists
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    } else {
      // Create new user
      const newUser = new User({
        email,
        password: bcrypt.hashSync(password, 10), // Hash the password before saving
        name
      });
      newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

// User login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, err => {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
  // Send user data as JSON response
  res.redirect(`http://localhost:3000/login/success?user=${encodeURIComponent(JSON.stringify(req.user))}`);
}
);

export default router;
