const Joi = require('joi').extend(require('@joi/date'));
const HttpCodes = require('../helpers/http-codes');

const getStatisticsSchema = Joi.object({
  startDate: Joi.date().raw().format('DD.MM.YYYY').required(),
  endDate: Joi.date().raw().format('DD.MM.YYYY').required(),
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

const validateStatisticsQuery = (req, res, next) => {
  return validateRequestAgainstSchema(getStatisticsSchema, req.query, next);
};

module.exports = { validateStatisticsQuery };