import { getAllCategories, getCategoryById, getAllProjectsOfACategory, updateCategoryAssignments, getAllCategoriesOfAProject } from '../models/categories.js';
import { body, validationResult } from "express-validator";
import { getProjectDetails } from '../models/projects.js';

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



export { categoriesPage, categoryDetailsPage, assignCategoriesForm, processAssignCategoriesForm };