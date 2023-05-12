const { validInsert } = require('./validationSchemas');

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
module.exports = {
  validaInsert,
  validField,
};
