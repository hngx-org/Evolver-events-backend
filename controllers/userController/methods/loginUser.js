import generateToken from '../../../middleware/jwt.js';
import passport from 'passport';

// Handle user login with Google OAuth
export const googleLogin = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  };
  
  // Callback route after Google OAuth authentication
  export const googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Authentication failed' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      const token = generateToken(user);
  
      // Respond with success message or redirect to the dashboard
      res.json({ message: 'Authentication successful', user , token });
    })(req, res, next);
  };
