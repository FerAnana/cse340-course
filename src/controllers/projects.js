import { getAllProjects } from '../models/projects.js';

const projectsPage = async (req, res) => {
    const projects = await getAllProjects();
    console.log(projects);

    const title = 'Service projects'
    res.render('projects', { title, projects });
};

export { projectsPage };