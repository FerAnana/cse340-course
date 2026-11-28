import express from 'express';

import { indexPage } from './controllers/index.js';
import { categoriesPage, categoryDetailsPage, assignCategoriesForm, processAssignCategoriesForm, newCategoryForm, processNewCategoryForm, editCategoryForm, categoryValidation, processEditCategoryForm } from './controllers/categories.js';
import { newOrganizationForm, organizationsPage, processNewOrganizationForm, organizationDetailsPage, organizationValidation, editOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage, processNewProjectForm, newProjectForm, projectValidation, editProjectForm, processEditProjectForm } from './controllers/projects.js';
import { userRegistrationForm, processUserRegistrationForm, loginForm, processLoginForm, processLogout, loginValidation, registerValidation, requireLogin, dashboard } from './controllers/users.js';
import { errorsPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', indexPage);

// Organization routes
router.get('/organizations', organizationsPage);
router.get('/organization/:id', organizationDetailsPage);
router.get('/new-organization', newOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', editOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Project routes
router.get('/projects', projectsPage);
router.get('/project/:id', projectDetailsPage);
router.get('/new-project', newProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/edit-project/:id', editProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Category routes
router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
router.get('/new-category', newCategoryForm);
router.post('/new-category/', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', editCategoryForm)
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm)
router.get('/assign-categories/:projectId', assignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Registration routes
router.get('/register', userRegistrationForm);
router.post('/register', registerValidation, processUserRegistrationForm);

// Login/logout routes
router.get('/login', loginForm);
router.post('/login', loginValidation, processLoginForm);
router.get('/logout', processLogout);

// Dashboard route
router.get('/dashboard', requireLogin, dashboard);

// error-handling routes
router.get('/test-error', errorsPage);

export default router;