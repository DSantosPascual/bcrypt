const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/authMiddleware');
const users = require('../data/users');
const { secret } = require('../crypto/config');

const router = express.Router();

//! Página de inicio
router.get('/', (req, res) => {
  const isAuthenticated = !!req.cookies.token;
  res.send(`
    <h1>Welcome</h1>
    ${isAuthenticated 
      ? `<a href="/dashboard">Go to Dashboard</a><br><form action="/logout" method="POST"><button type="submit">Logout</button></form>`
      : `<form action="/login" method="POST">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
         </form>`}
  `);
});

//! Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).send('Invalid credentials.');
  }

  const token = jwt.sign({ id: user.id, name: user.name }, secret, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }).redirect('/dashboard');
});

//! Dashboard
router.get('/dashboard', verifyToken, (req, res) => {
  res.send(`<h1>Welcome ${req.user.name}</h1><a href="/">Back to Home</a>`);
});

//! Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token').redirect('/');
});

module.exports = router;
