import { getAllCategories, getCategoryById, getAllProjectsOfACategory, updateCategoryAssignments, getAllCategoriesOfAProject, createCategory, updateCategory } from '../models/categories.js';
import { body, validationResult } from "express-validator";
import { getProjectDetails } from '../models/projects.js';

const categoryValidation = [
  body('categoryName')
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be between 3 and 100 characters'),
]

const categoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  console.log(categories);

  const title = 'Service Categories';
  res.render('categories', { title, categories })
};

const categoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const projects = await getAllProjectsOfACategory(categoryId);

  const title = 'Category Details';
  res.render('category', { title, category, projects });
};

const assignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories()
  const assignedCategories = await getAllCategoriesOfAProject(projectId);
  const title = 'Assign Categories to Project';

  res.render('assign-categories', { title, projectDetails, categories, assignedCategories })
}

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];

  // Ensure selectedCategoryIds is an array
  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash('success', 'Categories were updated correctly!');
  res.redirect(`/project/${projectId}`);
}

const newCategoryForm = async (req, res) => {
  const title = 'New category';

  res.render('new-category', { title })
};

const processNewCategoryForm = async (req, res, next) => {
  try {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      results.array().forEach((error) => {
        req.flash('error', error.msg);
      });

      return res.redirect('/new-category');
    }

    const { categoryName } = req.body;
    await createCategory(categoryName);

    req.flash('success', 'Category created successfully!');
    res.redirect('/categories');
  } catch (error) {
    console.error('Error creating category:', error);
    next(error);
  }
};

const editCategoryForm = async (req, res, next) => {
  const categoryId = Number(req.params.id);

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    req.flash('error', 'Invalid category ID.');
    return res.redirect('/categories');
  }

  try {
    const category = await getCategoryById(categoryId);

    if (!category) {
      req.flash('error', 'Category not found.');
      return res.redirect('/categories');
    }

    const title = 'Edit category';
    res.render('edit-category', { title, category });
  } catch (error) {
    console.error('Error loading edit category form:', error);
    next(error);
  }
};

const processEditCategoryForm = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      results.array().forEach((error) => {
        req.flash('error', error.msg);
      });

      return res.redirect(`/edit-category/${categoryId}`);
    }

    const { categoryName } = req.body;
    const updated = await updateCategory(categoryId, categoryName);

    if (!updated) {
      req.flash('error', 'Category not found.');
      return res.redirect('/categories');
    }

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error('Error updating category:', error);
    next(error);
  }
};



export { categoriesPage, categoryDetailsPage, assignCategoriesForm, processAssignCategoriesForm, categoryValidation, newCategoryForm, processNewCategoryForm, editCategoryForm, processEditCategoryForm };