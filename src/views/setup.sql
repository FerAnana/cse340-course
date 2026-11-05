CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_sponsoring_organization
        FOREIGN KEY (organization_id) 
        REFERENCES organization (organization_id)
        ON DELETE CASCADE
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    -- A composite primary key ensures a project can't be assigned the exact same category twice
    PRIMARY KEY (project_id, category_id),
    
    -- Foreign key linking to the projects table
    CONSTRAINT fk_project
        FOREIGN KEY (project_id) 
        REFERENCES projects (project_id) 
        ON DELETE CASCADE,
        
    -- Foreign key linking to the categories table
    CONSTRAINT fk_category
        FOREIGN KEY (category_id) 
        REFERENCES categories (category_id) 
        ON DELETE CASCADE
);

INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
(
    'BrightFuture Builders', 
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
    'info@brightfuturebuilders.org', 
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers', 
    'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
    'contact@greenharvest.org', 
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers', 
    'A volunteer coordination group supporting local charities and service initiatives.', 
    'hello@unityserve.org', 
    'unityserve-logo.png'
);

INSERT INTO projects (organization_id, title, description, location, project_date) VALUES
-- BrightFuture Builders Projects
(
    (SELECT organization_id FROM organization WHERE name = 'BrightFuture Builders'),
    'Community Center Roof Solar Upgrade',
    'Installing solar panels on the community center roof to lower energy expenses and promote clean energy.',
    'Austin, TX',
    '2026-06-15'
),
(
    (SELECT organization_id FROM organization WHERE name = 'BrightFuture Builders'),
    'Downtown Public Library Accessibility Ramp',
    'Constructing a modern, ADA-compliant wheelchair access ramp at the main public library entrance.',
    'Austin, TX',
    '2026-07-10'
),
(
    (SELECT organization_id FROM organization WHERE name = 'BrightFuture Builders'),
    'Riverside Park Eco-Bridge Restoration',
    'Rebuilding and reinforcing the pedestrian wooden footbridge using sustainable, weather-treated lumber.',
    'San Antonio, TX',
    '2026-08-05'
),
(
    (SELECT organization_id FROM organization WHERE name = 'BrightFuture Builders'),
    'Low-Income Housing Weatherization Initiative',
    'Insulating windows and doors for low-income families to improve winter energy efficiency.',
    'Houston, TX',
    '2026-09-20'
),
(
    (SELECT organization_id FROM organization WHERE name = 'BrightFuture Builders'),
    'Neighborhood Playground Upgrades and Shading',
    'Building shaded seating structures and installing safe rubber ground padding at the local park.',
    'Dallas, TX',
    '2026-10-12'
),

-- GreenHarvest Growers Projects
(
    (SELECT organization_id FROM organization WHERE name = 'GreenHarvest Growers'),
    'Eastside Community Urban Garden Launch',
    'Transforming an empty vacant lot into raised vegetable beds for neighborhood families.',
    'Chicago, IL',
    '2026-05-18'
),
(
    (SELECT organization_id FROM organization WHERE name = 'GreenHarvest Growers'),
    'Rooftop Greenhouse Installation Workshop',
    'Building a small-scale modular greenhouse to extend the local growing season through autumn.',
    'Chicago, IL',
    '2026-06-22'
),
(
    (SELECT organization_id FROM organization WHERE name = 'GreenHarvest Growers'),
    'Youth Composting and Soil Science Camp',
    'An interactive weekend workshop teaching local kids about organic waste composting and soil health.',
    'Evanston, IL',
    '2026-07-15'
),
(
    (SELECT organization_id FROM organization WHERE name = 'GreenHarvest Growers'),
    'Neighborhood Farmers Market and Nutrition Fair',
    'Organizing a local produce market showcasing organic crops grown by community members.',
    'Chicago, IL',
    '2026-08-30'
),
(
    (SELECT organization_id FROM organization WHERE name = 'GreenHarvest Growers'),
    'Winterizing Community Plots and Seed Saving',
    'Collecting native seeds and preparing garden beds with cover crops for the winter season.',
    'Chicago, IL',
    '2026-10-05'
),

-- UnityServe Volunteers Projects
(
    (SELECT organization_id FROM organization WHERE name = 'UnityServe Volunteers'),
    'Annual Back-to-School Supply Drive',
    'Collecting and packing backpacks filled with notebooks, pencils, and supplies for local students.',
    'Denver, CO',
    '2026-08-10'
),
(
    (SELECT organization_id FROM organization WHERE name = 'UnityServe Volunteers'),
    'Citywide Winter Coat and Blanket Distribution',
    'Gathering warm winter clothing items and distributing them to individuals experiencing homelessness.',
    'Denver, CO',
    '2026-11-14'
),
(
    (SELECT organization_id FROM organization WHERE name = 'UnityServe Volunteers'),
    'Senior Citizen Digital Literacy Workshop',
    'Providing one-on-one tech support and training to help senior citizens navigate smartphones and computers.',
    'Aurora, CO',
    '2026-06-04'
),
(
    (SELECT organization_id FROM organization WHERE name = 'UnityServe Volunteers'),
    'Neighborhood Food Bank Packing Day',
    'Sorting pantry items and assembling emergency food boxes for local families in need.',
    'Denver, CO',
    '2026-07-25'
),
(
    (SELECT organization_id FROM organization WHERE name = 'UnityServe Volunteers'),
    'Spring Neighborhood Cleanup and Tree Planting',
    'Cleaning up litter from public spaces and planting native saplings along local walkways.',
    'Lakewood, CO',
    '2026-05-09'
);

-- Step 1: Insert the 3 categories
INSERT INTO categories (category_name) VALUES
('Sustainability & Environment'),
('Community Development'),
('Education & Support');

-- Step 2: Link every project to at least one category using the junction table
INSERT INTO project_categories (project_id, category_id) VALUES

-- === BrightFuture Builders Projects ===
-- Project 1: Solar Upgrade (Sustainability & Community)
(
    (SELECT project_id FROM projects WHERE title = 'Community Center Roof Solar Upgrade'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),
(
    (SELECT project_id FROM projects WHERE title = 'Community Center Roof Solar Upgrade'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 2: Library Ramp (Community)
(
    (SELECT project_id FROM projects WHERE title = 'Downtown Public Library Accessibility Ramp'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 3: Eco-Bridge (Sustainability & Community)
(
    (SELECT project_id FROM projects WHERE title = 'Riverside Park Eco-Bridge Restoration'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),
(
    (SELECT project_id FROM projects WHERE title = 'Riverside Park Eco-Bridge Restoration'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 4: Housing Weatherization (Sustainability)
(
    (SELECT project_id FROM projects WHERE title = 'Low-Income Housing Weatherization Initiative'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),
-- Project 5: Playground Upgrades (Community)
(
    (SELECT project_id FROM projects WHERE title = 'Neighborhood Playground Upgrades and Shading'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),

-- === GreenHarvest Growers Projects ===
-- Project 6: Urban Garden (Sustainability & Community)
(
    (SELECT project_id FROM projects WHERE title = 'Eastside Community Urban Garden Launch'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),
(
    (SELECT project_id FROM projects WHERE title = 'Eastside Community Urban Garden Launch'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 7: Greenhouse (Sustainability)
(
    (SELECT project_id FROM projects WHERE title = 'Rooftop Greenhouse Installation Workshop'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),
-- Project 8: Soil Science Camp (Sustainability & Education)
(
    (SELECT project_id FROM projects WHERE title = 'Youth Composting and Soil Science Camp'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),
(
    (SELECT project_id FROM projects WHERE title = 'Youth Composting and Soil Science Camp'),
    (SELECT category_id FROM categories WHERE category_name = 'Education & Support')
),
-- Project 9: Farmers Market (Community & Education)
(
    (SELECT project_id FROM projects WHERE title = 'Neighborhood Farmers Market and Nutrition Fair'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
(
    (SELECT project_id FROM projects WHERE title = 'Neighborhood Farmers Market and Nutrition Fair'),
    (SELECT category_id FROM categories WHERE category_name = 'Education & Support')
),
-- Project 10: Winterizing Plots (Sustainability)
(
    (SELECT project_id FROM projects WHERE title = 'Winterizing Community Plots and Seed Saving'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),

-- === UnityServe Volunteers Projects ===
-- Project 11: School Supply Drive (Education & Community)
(
    (SELECT project_id FROM projects WHERE title = 'Annual Back-to-School Supply Drive'),
    (SELECT category_id FROM categories WHERE category_name = 'Education & Support')
),
(
    (SELECT project_id FROM projects WHERE title = 'Annual Back-to-School Supply Drive'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 12: Coat Distribution (Community)
(
    (SELECT project_id FROM projects WHERE title = 'Citywide Winter Coat and Blanket Distribution'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 13: Digital Literacy (Education & Community)
(
    (SELECT project_id FROM projects WHERE title = 'Senior Citizen Digital Literacy Workshop'),
    (SELECT category_id FROM categories WHERE category_name = 'Education & Support')
),
(
    (SELECT project_id FROM projects WHERE title = 'Senior Citizen Digital Literacy Workshop'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 14: Food Bank (Community)
(
    (SELECT project_id FROM projects WHERE title = 'Neighborhood Food Bank Packing Day'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
),
-- Project 15: Cleanup and Tree Planting (Sustainability & Community)
(
    (SELECT project_id FROM projects WHERE title = 'Spring Neighborhood Cleanup and Tree Planting'),
    (SELECT category_id FROM categories WHERE category_name = 'Sustainability & Environment')
),
(
    (SELECT project_id FROM projects WHERE title = 'Spring Neighborhood Cleanup and Tree Planting'),
    (SELECT category_id FROM categories WHERE category_name = 'Community Development')
);