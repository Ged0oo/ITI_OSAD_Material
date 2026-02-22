const Joi = require('joi');
const { validate } = require('./validation');

const productCreationSchema = Joi.object({
  owner: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      'any.required': 'Owner is required',
      'string.pattern.base': 'Owner must be a valid MongoDB ID'
    }),
  name: Joi.string()
    .min(5)
    .max(20)
    .required()
    .messages({
      'string.min': 'Product name must be at least 5 characters',
      'string.max': 'Product name must not exceed 20 characters',
      'any.required': 'Product name is required'
    }),
  quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 1',
      'any.required': 'Quantity is required'
    }),
  categories: Joi.array()
    .items(Joi.string().min(1).max(50))
    .optional()
    .messages({
      'array.base': 'Categories must be an array'
    })
});

const productUpdateSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(20)
    .optional()
    .messages({
      'string.min': 'Product name must be at least 5 characters',
      'string.max': 'Product name must not exceed 20 characters'
    }),
  status: Joi.string()
    .valid('Instock', 'Outofstock', 'Discontinued')
    .optional()
    .messages({
      'any.only': 'Status must be one of: Instock, Outofstock, Discontinued'
    }),
  categories: Joi.array()
    .items(Joi.string().min(1).max(50))
    .optional()
    .messages({
      'array.base': 'Categories must be an array'
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
