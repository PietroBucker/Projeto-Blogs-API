const { validInsert, categoryName, validInsertPost } = require('./validationSchemas');

const validaInsert = async ({ displayName, email, password }) => {
  const { error } = validInsert.validate({ displayName, email, password }); 
  if (error) {
    return error.message;
  }
};

const validField = async (body) => {
  const { email, password } = body;
  if (email === '' || password === '') {
    return { message: 'Some required fields are missing' };
  }
  return body;
};

const validCategoryInsert = async (body) => {
  const { name } = body;
  const { error } = categoryName.validate(name);
  if (error) {
    return error.message;
  }
};

const validPost = async ({ title, content, categoryIds }) => {
  const { error } = validInsertPost.validate({ title, content, categoryIds });
  if (error) {
    return error.message;
  }
};

module.exports = {
  validaInsert,
  validField,
  validCategoryInsert,
  validPost,
};
