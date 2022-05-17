const { Router } = require('express');
const guard = require('../middlewares/guard');
const Controllers = require('../controllers/categories-controllers');

const categoriesRoutes = Router();

categoriesRoutes.get('/categories', guard, Controllers.getAllCategories);

module.exports = categoriesRoutes;