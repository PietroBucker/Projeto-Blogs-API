const { Category } = require('../models');
const { validCategoryInsert } = require('./validations/businessRole');

const findAll = async () => {
  const result = await Category.findAll();
  return result;
};

const insert = async (body) => {
  const error = await validCategoryInsert(body);
  if (error) {
    return { status: 400, message: '"name" is required' };
  }
  const result = await Category.create(body);
  return result;
};

module.exports = {
  findAll,
  insert,
};