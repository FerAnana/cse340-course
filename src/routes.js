import express from 'express';

import { indexPage } from './controllers/index.js';
import { categoriesPage } from './controllers/categories.js';
import { organizationsPage } from './controllers/organizations.js';
import { organizationDetailsPage } from './controllers/organizations.js';
import { projectsPage } from './controllers/projects.js';
import { errorsPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', indexPage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// error-handling routes
router.get('/test-error', errorsPage);

// Route for organization details page
router.get('/organization/:id', organizationDetailsPage);

export default router;