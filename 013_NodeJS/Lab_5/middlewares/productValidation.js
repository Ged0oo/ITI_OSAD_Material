const Joi = require('joi');
const { validate } = require('./validation');

const productCreationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Product name must be at least 3 characters',
      'string.max': 'Product name must not exceed 50 characters',
      'any.required': 'Product name is required'
    }),
  quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 0',
      'any.required': 'Quantity is required'
    }),
  category: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.min': 'Category must be at least 1 character',
      'string.max': 'Category must not exceed 50 characters',
      'any.required': 'Category is required'
    })
});

const productUpdateSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Product name must be at least 3 characters',
      'string.max': 'Product name must not exceed 50 characters'
    }),
  quantity: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 0'
    }),
  category: Joi.string()
    .min(1)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Category must be at least 1 character',
      'string.max': 'Category must not exceed 50 characters'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

const stockUpdateSchema = Joi.object({
  operation: Joi.string()
    .valid('restock', 'destock')
    .required()
    .messages({
      'any.only': 'Operation must be either "restock" or "destock"',
      'any.required': 'Operation is required'
    }),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 1',
      'any.required': 'Quantity is required'
    })
});

const validateProductCreation = validate(productCreationSchema, 'body');

const validateProductUpdate = validate(productUpdateSchema, 'body');

const validateStockUpdate = validate(stockUpdateSchema, 'body');

module.exports = {
  validateProductCreation,
  validateProductUpdate,
  validateStockUpdate
};
