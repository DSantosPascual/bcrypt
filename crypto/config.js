const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//! Generar el secreto
const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);

module.exports = {
  secret,
  hashedSecret,
};
