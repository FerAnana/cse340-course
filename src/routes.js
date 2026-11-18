import express from 'express';

import { indexPage } from './controllers/index.js';
import { categoriesPage, categoryDetailsPage } from './controllers/categories.js';
import { newOrganizationForm, organizationsPage, processNewOrganizationForm, organizationDetailsPage } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage } from './controllers/projects.js';
import { errorsPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', indexPage);
router.get('/organizations', organizationsPage);
router.get('/organization/:id', organizationDetailsPage);
router.get('/new-organization', newOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);
router.get('/projects', projectsPage);
router.get('/project/:id', projectDetailsPage);
router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
// error-handling routes
router.get('/test-error', errorsPage);

export default router;