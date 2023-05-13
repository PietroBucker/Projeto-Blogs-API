const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const { validPost, validUpdatePosts } = require('./validations/businessRole');

const findAll = async () => {
  const result = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }], 
  });
  return result;
};

const findById = async (id) => {
  const result = await BlogPost.findByPk(id, { 
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }], 
    
  });
  return result;
};

const update = async (id, body, userId) => {
  const { title, content } = body;
  const error = await validUpdatePosts(body);
  if (error) {
    return { status: 400, message: error };
  }
  const [teste] = await BlogPost.update(
  { title, content }, 
  { where: { id, [Op.and]: { userId } } },
);

  if (teste === 0) {
    return { status: 401, message: 'Unauthorized user' };
  }
  const find = await findById(id);
    return find;
};

const insert = async (body) => {
  const error = await validPost(body);
  if (error) {
    return { status: 400, message: error };
  }
  const result = await BlogPost.create(body);
  
  const ifExist = await Category.findAll();
  const dataValues = ifExist.map((element) => element.dataValues.id);

  if (dataValues.toString() !== body.categoryIds.toString()) {
    return { status: 400, message: 'one or more "categoryIds" not found' };
  }

  await body.categoryIds.map(async (element) => {
    await PostCategory.create({ postId: result.id, categoryId: element });
  });

  return result;
};

module.exports = {
  findAll,
  findById,
  update,
  insert,
};