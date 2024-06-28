import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default function(passport) {
  // Local Strategy for username and password authentication
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  // Google Strategy for Google OAuth authentication
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          // Add other fields you might want to set on user creation
         
          email: profile.emails[0].value,
          googleId:profile.id,
          name:profile.displayName
        }
      });
      return cb(null, user);
    } catch (err) {
      console.log(err);
      return cb(err);
    }
  }));

  // Serializing user to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserializing user to retrieve from session
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
}