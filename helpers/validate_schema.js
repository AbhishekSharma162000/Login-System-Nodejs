const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');

const joiPassword = Joi.extend(joiPasswordExtendCore);

const authSchema = Joi.object({
    username: Joi.string()
      .trim(true)
      .min(3)
      .max(40),

    email: Joi.string()
      .email()
      .insensitive()
      .trim(true),
    
    mobile: Joi.string()
        .min(10)
        .max(10),

    password: joiPassword.string()
      .trim(true)
      .min(8)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required()
  });

  module.exports = {
    authSchema
  }