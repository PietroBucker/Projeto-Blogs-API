const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const { validPost, validUpdatePosts } = require('./validations/businessRole');

const findAll = async (query) => {
  const result = await BlogPost.findAll({
    where: { 
      [Op.or]: { 
        title: { [Op.like]: `%${query}%` }, 
        content: { [Op.like]: `%${query}%` } } }, 
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
  const [result] = await BlogPost.update(
  { title, content }, 
  { where: { id, [Op.and]: { userId } } },
);

  if (result === 0) {
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

const postDelete = async (id, userId) => {
  const existPost = await findById(id);
  if (!existPost) {
    return { status: 404, message: 'Post does not exist' };
  }
  const result = await BlogPost.destroy({ where: { [Op.and]: { id, userId } } });
  if (result === 0) {
    return { status: 401, message: 'Unauthorized user' };
  }
  return result;
};

module.exports = {
  findAll,
  findById,
  update,
  insert,
  postDelete,
};
