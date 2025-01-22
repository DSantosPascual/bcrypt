const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Acceso denegado. Token no disponible.');

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Token Inválido.');
  }
}

module.exports = { verifyToken };
