const { User } = require('../models');
const { tokenCreat } = require('./auth');
const { validaInsert } = require('./businessRole');

const findAll = async () => {
  const result = await User.findAll();
  return result;
};

const findByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const insert = async (body) => {
  const error = await validaInsert(body);
  if (error) {
    return { status: 400, message: error };
  }
  const findUser = await findByEmail(body.email);
  if (findUser) {
    return { status: 409, message: 'User already registered' };
  }
  const result = await User.create(body);
  const token = await tokenCreat(result);
  return token;
};

module.exports = {
  findAll,
  findByEmail,
  insert,
};