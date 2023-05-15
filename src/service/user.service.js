const { User } = require('../models');
const { tokenCreat } = require('./validations/auth');
const { validaInsert } = require('./validations/businessRole');

const findAll = async () => {
  const result = await User.findAll({ attributes: { exclude: 'password' } });
  return result;
};

const findByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const findById = async (id) => {
  const result = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
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

const userDelete = async (id) => {
  const result = await User.destroy({ where: { id } });
  return result;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  insert,
  userDelete,
};