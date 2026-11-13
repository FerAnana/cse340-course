import { getAllOrganizations, getOrganizationDetails } from '../models/organization.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const organizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const OrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organziationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
}

export { organizationsPage, OrganizationDetailsPage };