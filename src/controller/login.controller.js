const { loginService } = require('../service');

const login = async (req, res) => {
  const { body } = req;
  const result = await loginService.login(body);
  if (result.message) {
    return res.status(400).json(result);
  }
  return res.status(200).json(result);
};

module.exports = {
  login,
};
