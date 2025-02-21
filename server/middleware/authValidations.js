const Joi = require("joi");

const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(1).max(10).required(),
    phone: Joi.string().min(0).max(10).required(),
    password: Joi.string().min(4).max(10).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: `Bad Request : ${error}`,
    });
  }
  next();
};

const signInValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: `Bad Request : ${error}`,
    });
  }
  next();
};

const codeValidation = (req, res, next) => {
  const schema = Joi.object({
    code: Joi.string().max(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(401).json({
      success: false,
      message: "Please Enter the Code",
    });
  }
  next();
};

module.exports = {
  signUpValidation,
  signInValidation,
  codeValidation,
};
