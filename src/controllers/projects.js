import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    console.log(projects);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const projectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);

    res.render('project', { projectDetails });
}

export { projectsPage, projectDetailsPage };
