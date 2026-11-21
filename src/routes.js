import express from 'express';

import { indexPage } from './controllers/index.js';
import { categoriesPage, categoryDetailsPage, assignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { newOrganizationForm, organizationsPage, processNewOrganizationForm, organizationDetailsPage, organizationValidation, editOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage, processNewProjectForm, newProjectForm, projectValidation, editProjectForm, processEditProjectForm } from './controllers/projects.js';
import { errorsPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', indexPage);
router.get('/organizations', organizationsPage);
router.get('/organization/:id', organizationDetailsPage);
router.get('/new-organization', newOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', editOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/projects', projectsPage);
router.get('/project/:id', projectDetailsPage);
router.get('/new-project', newProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/edit-project/:id', editProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
router.get('/assign-categories/:projectId', assignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
// error-handling routes
router.get('/test-error', errorsPage);

export default router;