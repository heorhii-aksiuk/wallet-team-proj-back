const { Router } = require('express');
const guard = require('../middlewares/guard');
const validateMongoId = require("../validation/mongo-id-validation");
const {
  validateCreatedCategory,
  validateUpdatedCategory,
} = require("../validation/categories-validation");
const Controllers = require('../controllers/categories-controllers');

const categoriesRoutes = Router();

categoriesRoutes.get(
    "/hardcoded",
    guard,
    Controllers.getHardCodedCategories,
);

categoriesRoutes
  .get("/", guard, Controllers.getCategories)
  .post("/", guard, validateCreatedCategory, Controllers.addCategory);

  categoriesRoutes
  .get(
    "/:categoryId",
    guard,
    validateMongoId,
    Controllers.getCategoryById,
  )
  .put(
    "/:categoryId",
    guard,
    validateMongoId,
    validateUpdatedCategory,
    Controllers.updateCategoryById,
  )
  .delete(
    "/:categoryId",
    guard,
    validateMongoId,
    Controllers.deleteCategoryById,
  );

module.exports = categoriesRoutes;