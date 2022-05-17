const Joi = require('joi').extend(require('@joi/date'));
const HttpCodes = require('../helpers/http-codes');
const Categories = require('../helpers/categories');

const categoriesNames = Categories.map(category => category.name);

const createTransactionSchema = Joi.object({
  date: Joi.date().raw().format('YYYY-MM-DD').required(),
  income: Joi.boolean().required(),
  category: Joi.string()
    .trim()
    .valid(...categoriesNames)
    .required(),
  comment: Joi.string().trim().max(150).optional(),
  sum: Joi.number().min(0).required(),
});

const validateRequestAgainstSchema = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

const validateCreatedTransaction = (req, res, next) => {
  return validateRequestAgainstSchema(createTransactionSchema, req.body, next);
};

module.exports = { validateCreatedTransaction };