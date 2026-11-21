import db from './db.js'

const getAllProjects = async () => {
    const query = 'SELECT p.project_id, o.name, p.title, p.description, p.location, p.project_date FROM projects p JOIN organization o ON p.organization_id = o.organization_id;';

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
    SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        project_date
    FROM projects
    WHERE organization_id = $1
    ORDER BY project_date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const getUpcomingProjects = async (number_of_projects) => {
    try {
        const query = `
            SELECT 
                p.project_id,
                p.title,
                p.description,
                p.project_date,
                p.location,
                p.organization_id,
                o.name
            FROM projects p
            JOIN organization o ON p.organization_id = o.organization_id
            WHERE p.project_date >= CURRENT_DATE
            ORDER BY p.project_date ASC
            LIMIT $1;
        `;

        const values = [number_of_projects];
        const result = await db.query(query, values);

        return result.rows;
    } catch (error) {
        console.error("Error fetching upcoming projects:", error);
        throw error;
    }
}

const getProjectDetails = async (id) => {
    try {
        const query = `
            SELECT 
                p.project_id,
                p.title,
                p.description,
                p.project_date,
                p.location,
                p.organization_id,
                o.name AS organization_name
            FROM projects p
            JOIN organization o ON p.organization_id = o.organization_id
            WHERE p.project_id = $1;
        `;

        const values = [id];
        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
}

const createProject = async (organizationId, title, description, location, date) => {
    try {
        const query = `
            INSERT INTO public.projects (
                organization_id,
                title,
                description,
                location,
                project_date
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING project_id;
        `;

        const queryParams = [organizationId, title, description, location, date];
        const result = await db.query(query, queryParams);

        return result.rows[0];
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};

const updateProject = async (projectId, organizationId, title, description, location, date) => {
    try {
        const query = `
            UPDATE public.projects
            SET 
                organization_id = $2,
                title = $3,
                description = $4,
                location = $5,
                project_date = $6
            WHERE project_id = $1
            RETURNING *;
        `;

        const queryParams = [projectId, organizationId, title, description, location, date];
        const result = await db.query(query, queryParams);

        if (result.rows.length === 0) {
            throw new Error(`Project with ID ${projectId} not found.`)
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject };