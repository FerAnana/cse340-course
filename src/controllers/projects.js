import { getUpcomingProjects, getProjectDetails, createProject } from '../models/projects.js';
import { getAllCategoriesOfAProject } from '../models/categories.js';
import { getAllOrganizations } from '../models/organization.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [
    body('organizationId')
        .notEmpty()
        .withMessage("Project's organization is required")
        .isInt()
        .withMessage('Invalid organization selected'),
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Location cannot exceed 200 characters'),
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid date.')
];

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
    const categories = await getAllCategoriesOfAProject(projectId);

    const title = 'Project Details';
    res.render('project', { title, projectDetails, categories });
}

const newProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Create a project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }

    const { organizationId, title, description, location, date } = req.body;
    await createProject(organizationId, title, description, location, date);

    req.flash('success', 'Project created successfully!');
    res.redirect('/projects');
};

export { projectsPage, projectDetailsPage, newProjectForm, processNewProjectForm, projectValidation };