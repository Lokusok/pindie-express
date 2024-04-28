const categoriesRouter = require('express').Router();

const { findAllCategories, createCategory, findCategoryById, updateCategory, deleteCategory, checkIsCategoryExists } = require('../middlewares/categories');
const { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted } = require('../controllers/categories');

categoriesRouter.get('/', findAllCategories, sendAllCategories);
categoriesRouter.post(
  "/categories", 
  findAllCategories,
  checkIsCategoryExists, 
  createCategory, 
  sendCategoryCreated
);
categoriesRouter.get('/:id', findCategoryById, sendCategoryById);
categoriesRouter.put('/:id', 
  updateCategory,
  sendCategoryUpdated,
);
categoriesRouter.delete('/:id', deleteCategory, sendCategoryDeleted);

module.exports = categoriesRouter;
