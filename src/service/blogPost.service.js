const { BlogPost, PostCategory, Category, User } = require('../models');
const { validPost } = require('./validations/businessRole');

const findAll = async () => {
  const result = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }], 
    
  });
  return result;
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
  insert,
};