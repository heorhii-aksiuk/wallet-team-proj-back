const Joi = require("joi").extend(require("@joi/date"));
const HttpCodes = require("../helpers/http-codes");
const hexColorFormat = require("../helpers/hex-color-regex");

const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(1).max(30).required(),
  income: Joi.boolean().required(),
  color: Joi.string().trim().regex(hexColorFormat).optional(),
  icon: Joi.string().trim().min(1).max(30).optional(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(1).max(30).optional(),
  income: Joi.boolean().optional(),
  color: Joi.string().trim().regex(hexColorFormat).optional(),
  icon: Joi.string().trim().min(1).max(30).optional(),
}).or("name", "income", "color", "icon");

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

module.exports = {
  validateCreatedCategory: (req, _res, next) => {
    return validateRequestAgainstSchema(createCategorySchema, req.body, next);
  },
  validateUpdatedCategory: (req, _res, next) => {
    return validateRequestAgainstSchema(updateCategorySchema, req.body, next);
  },
};