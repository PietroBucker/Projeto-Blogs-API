const joi = require('joi');
// refente a validaçoes do User
const email = joi.string().email().required();
const password = joi.string().min(6).required();
const displayName = joi.string().min(8).required();

const validInsert = joi.object({
  displayName,
  email,
  password,
}).messages({
  'string.empty': 'Some required fields are missing',
});

// referente a validaçoes da Category

const categoryName = joi.string().required();

// referente a validaçao do BlogPost

const validInsertPost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().min(1).required(),
}).messages({
  'string.empty': 'Some required fields are missing',
});

const validUpdatePost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
}).messages({
  'string.empty': 'Some required fields are missing',
});
module.exports = {
  validInsert,
  categoryName,
  validInsertPost,
  validUpdatePost,
};
