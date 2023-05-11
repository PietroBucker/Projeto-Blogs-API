const { userService } = require('../service');

const insert = async (req, res) => {
  const { body } = req;
  const insertId = await userService.insert(body);
  return res.status(201).json(insertId);
};

const findByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await userService.findByEmail(email);
  return res.status(200).json(result);
};

module.exports = {
  findByEmail,
  insert,
};
