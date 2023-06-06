const joi = require("joi");

const userValidation = joi.object({
  name: joi.string().trim(true).min(3).max(25).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(6).required(),
});

const validateUser = (req, res, next) => {
  const user = req.body;
  const validate = userValidation.validate(user);

  if (validate.error) {
    return res.status(400).json({ error: validate.error });
  }

  next();
};

module.exports = validateUser;
