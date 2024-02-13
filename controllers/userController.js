const { User } = require('../models');
const bcrypt = require('bcrypt');

const userController = {
  // Render the sign-up form
  renderSignupForm(req, res) {
    res.render('signup');
  },

  // Handle user sign-up
  async signup(req, res) {
    try {
      const { username, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });

      // Redirect the user to the homepage or dashboard after successful sign-up
      res.redirect('/');
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Render the login form
  renderLoginForm(req, res) {
    res.render('login');
  },

  // Handle user login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user in the database by username
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Compare the password provided with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Store the user's ID in the session to indicate that the user is logged in
      req.session.userId = user.id;

      // Redirect the user to the homepage or dashboard after successful login
      res.redirect('/');
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle user logout
  logout(req, res) {
    // Destroy the session to log the user out
    req.session.destroy((error) => {
      if (error) {
        console.error('Error logging out user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      // Redirect the user to the homepage after successful logout
      res.redirect('/');
    });
  },

  // Add more controller methods as needed
};

module.exports = userController;