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

const assignCategoryToProject = async (projectId, categoryId) => {
    try {
        const query = `
            INSERT INTO public.project_categories (project_id, category_id)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const queryParams = [projectId, categoryId];
        const result = await db.query(query, queryParams);

        return result.rows[0];
    } catch (error) {
        console.error("Error assigning category to project:", error);
        throw error;
    };
};

const updateCategoryAssignments = async (projectId, categoryIds = []) => {
    try {
        const deleteQuery = 'DELETE FROM public.project_categories WHERE project_id = $1;';
        await db.query(deleteQuery, [projectId]);

        const normalizedIds = Array.isArray(categoryIds)
            ? categoryIds
            : categoryIds
                ? [categoryIds]
                : [];

        for (const categoryId of normalizedIds) {
            await assignCategoryToProject(projectId, categoryId);
        }
    } catch (error) {
        console.error('Error updating category assignments:', error);
        throw error;
    }
};

const createCategory = async (categoryName) => {
    const query = `
        INSERT INTO public.categories (category_name)
        VALUES ($1)
        RETURNING category_id;
        `;

    const queryParams = [categoryName,];

    const result = await db.query(query, queryParams)
    return result.rows[0];
}

const updateCategory = async (categoryId, categoryName) => {
    const query = `
        UPDATE public.categories
        SET 
            category_name = $2
        WHERE category_id = $1
        RETURNING *;
        `;

    const queryParams = [categoryId, categoryName];
    const result = await db.query(query, queryParams);
    return result.rows[0];
}


export { getAllCategories, getCategoryById, getAllCategoriesOfAProject, getAllProjectsOfACategory, updateCategoryAssignments, createCategory, updateCategory };