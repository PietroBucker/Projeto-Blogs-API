const joi = require('joi');

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

module.exports = {
  validInsert,
};
