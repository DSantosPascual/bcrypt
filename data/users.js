const bcrypt = require('bcryptjs');

module.exports = [
  { 
    id: 1, 
    username: 'usuario1', 
    password: bcrypt.hashSync('contrasena123', 10), 
    name: 'Juan Pérez' 
  },
  { 
    id: 2, 
    username: 'usuario2', 
    password: bcrypt.hashSync('clave456', 10), 
    name: 'María López' 
  },
  { 
    id: 3, 
    username: 'usuario3', 
    password: bcrypt.hashSync('secreto789', 10), 
    name: 'Carlos García' 
  },
];
