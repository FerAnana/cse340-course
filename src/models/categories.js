import db from './db.js'

const getAllCategories = async () => {
    const query = 'SELECT category_id, category_name FROM public.categories;';

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async (categoryId) => {
    const query = 'SELECT category_id, category_name FROM public.categories WHERE category_id = $1;';
    const values = [categoryId];

    const result = await db.query(query, values);
    return result.rows[0];
};

const getAllCategoriesOfAProject = async (projectId) => {
    const query = 'SELECT c.category_id, c.category_name FROM public.categories c JOIN public.project_categories pc ON c.category_id = pc.category_id WHERE pc.project_id = $1;';
    const values = [projectId];

    const result = await db.query(query, values);
    return result.rows;
};

const getAllProjectsOfACategory = async (categoryId) => {
    const query = 'SELECT p.project_id, p.title FROM public.projects p JOIN public.project_categories pc on p.project_id = pc.project_id WHERE pc.category_id = $1;';
    const values = [categoryId];

    const result = await db.query(query, values);
    return result.rows;
};


export { getAllCategories, getCategoryById, getAllCategoriesOfAProject, getAllProjectsOfACategory };