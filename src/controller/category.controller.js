const { categoryService } = require('../service');

const findAll = async (req, res) => {
  const result = await categoryService.findAll();
  return res.status(200).json(result);
};

const insert = async (req, res) => {
  const { body } = req;
  const result = await categoryService.insert(body);
  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }
  return res.status(201).json(result);
};

module.exports = {
  findAll,
  insert,
};