const jwt = require('jsonwebtoken');
const { userService } = require('../service');
const { login } = require('./validationSchemas');

const secret = process.env.JWT_SECRET || 'meusgredo';
const jwtConfg = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const validaLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = login.validate({ email, password }); 
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const tokenCreat = async (req, res) => {
  const { email, password } = req.body;
 
  const user = await userService.findByEmail(email);
  if (!user || user.password !== password) {
   return res.status(400).json({ message: 'Invalid fields' });
  }
    try {
    const payload = {
      email,
      admin: false,
    };

    const token = jwt.sign(payload, secret, jwtConfg);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const validaToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    const user = await userService.findByPk();

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validaLogin,
  tokenCreat,
  validaToken,
};