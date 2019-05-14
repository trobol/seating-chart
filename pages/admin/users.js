import Table from '../../components/Table/Table';
import Layout from '../../components/Layout';

const Users = () => (
  <Layout>
    <Table link="/api/admin/users/" title="Users" method="get" canAdd canEdit canDelete />
  </Layout>
);

export default Users;
