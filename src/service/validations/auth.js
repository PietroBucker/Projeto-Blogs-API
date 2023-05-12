const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'meusgredo';
const jwtConfg = {
  expiresIn: '1y',
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

module.exports = {
  tokenCreat,
};