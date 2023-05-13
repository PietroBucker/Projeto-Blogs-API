const { blogPostService } = require('../service');

const findAll = async (req, res) => {
  const result = await blogPostService.findAll();
  return res.status(200).json(result);
};

const insert = async (req, res) => {
  const { body } = req;
  const { id } = req.user;
  const result = await blogPostService.insert({ ...body, userId: id });
  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }
  return res.status(201).json(result.dataValues);
};

module.exports = {
  findAll,
  insert,
};