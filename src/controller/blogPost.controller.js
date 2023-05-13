const { blogPostService } = require('../service');

const findAll = async (req, res) => {
  const result = await blogPostService.findAll();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await blogPostService.findById(id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(result);
};

const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const userId = req.user.id;
  const result = await blogPostService.update(id, body, userId);
  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }
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
  findById,
  update,
  insert,
};