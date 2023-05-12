const { userService } = require('../service');

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

module.exports = {
  findByEmail,
  insert,
};
