const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'meusgredo';
const jwtConfg = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const tokenCreat = async (body) => {
  const { id, email } = body;
    try {
    const payload = {
      id,
      email,
      admin: false,
    };

    const token = jwt.sign(payload, secret, jwtConfg);
    return { token };
  } catch (err) {
    return { message: 'Erro interno', error: err.message };
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
    const user = await User.findByPk();

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  tokenCreat,
  validaToken,
};