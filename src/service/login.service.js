const { tokenCreat } = require('./auth');
const { validField } = require('./businessRole');
const { User } = require('../models');

const login = async (body) => {
  const { email, password } = body;
  
  const result = await validField(body);
  if (result.message) {
    return result;
  }
  
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
   return { message: 'Invalid fields' };
  } 
  const token = await tokenCreat(result, body.email);
  return token;
};

module.exports = {
  login,
};