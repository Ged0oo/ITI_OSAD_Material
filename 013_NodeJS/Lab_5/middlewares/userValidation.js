const Joi = require('joi');
const { validate } = require('./validation');

const userCreationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(8)
    .max(50)
    .required()
    .messages({
      'string.alphanum': 'Username must contain only alphanumeric characters',
      'string.min': 'Username must be at least 8 characters long',
      'string.max': 'Username must not exceed 50 characters',
      'any.required': 'Username is required'
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 50 characters',
      'any.required': 'Password is required'
    }),

  firstName: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
      'string.min': 'First name must be at least 3 characters',
      'string.max': 'First name must not exceed 15 characters',
      'any.required': 'First name is required'
    }),
    
  dob: Joi.date()
    .optional()
    .messages({
      'date.base': 'Date of birth must be a valid date'
    })
});

const userLoginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(8)
    .max(50)
    .required()
    .messages({
      'string.alphanum': 'Username must contain only alphanumeric characters',
      'string.min': 'Username must be at least 8 characters long',
      'string.max': 'Username must not exceed 50 characters',
      'any.required': 'Username is required'
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 50 characters',
      'any.required': 'Password is required'
    })
});

const userUpdateSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(8)
    .max(50)
    .optional()
    .messages({
      'string.alphanum': 'Username must contain only alphanumeric characters',
      'string.min': 'Username must be at least 8 characters long',
      'string.max': 'Username must not exceed 50 characters'
    }),
  firstName: Joi.string()
    .min(3)
    .max(15)
    .optional()
    .messages({
      'string.min': 'First name must be at least 3 characters',
      'string.max': 'First name must not exceed 15 characters'
    }),
  dob: Joi.date()
    .optional()
    .messages({
      'date.base': 'Date of birth must be a valid date'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

const validateUserCreation = validate(userCreationSchema, 'body');
const validateUserLogin = validate(userLoginSchema, 'body');
const validateUserUpdate = validate(userUpdateSchema, 'body');

module.exports = {
  validateUserCreation,
  validateUserLogin,
  validateUserUpdate
};
