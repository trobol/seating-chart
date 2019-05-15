import Layout from '../../components/Layout';
import Table from '../../components/Table/Table';

const Projects = () => (
  <Layout>
    <Table link="/api/admin/projects/" title="projects" method="get" canAdd canDelete />
  </Layout>
);

export default Projects;
