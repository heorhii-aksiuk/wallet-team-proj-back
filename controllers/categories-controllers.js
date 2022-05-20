const HardCodedCategories = require('../helpers/categories');
const Categories = require('../repositories/categories-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');
const Messages = require("../helpers/messages");

class CategoriesControllers {
  getHardCodedCategories(req, res, next) {
    try {
      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { categories: HardCodedCategories },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const ownerId = req.user.id;

      const categories = await Categories.getAllCategories(ownerId);

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { categories },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const categoryId = req.params.categoryId;

      const [category] = await Categories.getCategoryById(ownerId, categoryId);

      if (!category) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND,
          message: Messages.NOT_FOUND_CATEGORY
        });
      }

      return res.status(HttpCodes.OK).json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  }

  async addCategory(req, res, next) {
    try {
      const category = req.body;
      const ownerId = req.user.id;

      const addedCategory = await Categories.addCategory(ownerId, category);

      return res.status(HttpCodes.CREATED).json({
        status: Statuses.SUCCESS,
        code: HttpCodes.CREATED,
        data: addedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategoryById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const categoryId = req.params.categoryId;
      const updates = req.body;

      const updatedCategory = await Categories.updateCategory(ownerId, categoryId, updates);

      if (!updatedCategory) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND,
          message: Messages.NOT_FOUND_CATEGORY
        });
      }

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { category: updatedCategory },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategoryById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const categoryId = req.params.categoryId;

      const deletedCategory = await Categories.removeCategory(ownerId, categoryId);

      if (!deletedCategory) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND,
          message: Messages.NOT_FOUND_CATEGORY
        });
      }

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        message: Messages.DELETE_CATEGORY
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriesControllers();