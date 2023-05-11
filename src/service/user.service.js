const { User } = require('../models');

const findAll = async () => {
  const result = await User.findAll();
  return result;
};

const findByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const insert = async (body) => {
  const inserId = await User.create(body);
  return inserId;
};

module.exports = {
  findAll,
  findByEmail,
  insert,
};