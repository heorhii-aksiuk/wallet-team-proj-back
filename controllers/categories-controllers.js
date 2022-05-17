const Categories = require('../helpers/categories');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');

class CategoriesControllers {
  async getAllCategories(req, res, next) {
    try {
      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { categories: Categories }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriesControllers();