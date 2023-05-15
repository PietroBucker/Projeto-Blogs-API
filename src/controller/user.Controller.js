const { userService } = require('../service');

const findAll = async (req, res) => {
  const result = await userService.findAll();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.findById(id);
  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(result);
};

const insert = async (req, res) => {
  const { body } = req;
  const result = await userService.insert(body);
  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }
  return res.status(201).json(result);
};

const findByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await userService.findByEmail(email);
  return res.status(200).json(result);
};

const userDelete = async (req, res) => {
  const { id } = req.user;
  await userService.userDelete(id);
  return res.status(204).json();
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  insert,
  userDelete,
};
