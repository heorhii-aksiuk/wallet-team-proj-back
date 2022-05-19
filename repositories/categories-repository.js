const Category = require("../models/category-model");

class Categories {
  async getCategoryById(ownerId, categoryId) {
    return await Category.find({ owner: ownerId, _id: categoryId });
  }

  async getAllCategories(ownerId) {
    return await Category.find({ owner: ownerId });
  }

  async addCategory(ownerId, category) {
    return await Category.create({
      ...category,
      owner: ownerId,
    });
  }

  async updateCategory(ownerId, categoryId, updates) {
    return await Category.findOneAndUpdate(
      { owner: ownerId, _id: categoryId },
      { ...updates },
      { new: true },
    );
  }

  async removeCategory(ownerId, categoryId) {
    return await Category.findOneAndDelete({
      owner: ownerId,
      _id: categoryId,
    });
  }
}

module.exports = new Categories();