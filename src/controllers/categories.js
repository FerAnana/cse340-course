import { getAllCategories, getCategoryById, getAllProjectsOfACategory } from '../models/categories.js';

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



export { categoriesPage, categoryDetailsPage };