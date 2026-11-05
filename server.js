import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organization.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Enviroment variables
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Configure Express middleware
 */
// Serve static files from the public directory
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))
app.use(express.static(path.join(__dirname, 'public')))


/**
 * Routes
 */
app.get('/', async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
  const organizations = await getAllOrganizations();
  console.log(organizations);

  const title = 'Our Partner Organizations';
  res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {
  const projects = await getAllProjects();
  console.log(projects);

  const title = 'Service projects'
  res.render('projects', { title, projects });
});

app.get('/categories', async (req, res) => {
  const categories = await getAllCategories();
  console.log(categories); 

  const title = 'Service Categories';
  res.render('categories', { title, categories })
})

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Enviroment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connectin to the database:', error);
  }
})