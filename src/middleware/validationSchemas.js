const joi = require('joi');

const email = joi.string().email().min(6).required();
const password = joi.string().min(8).required();

const login = joi.object({
  email,
  password,
}).messages({
  'string.empty': 'Some required fields are missing',
});

module.exports = {
  login,
};
