import Table from '../../components/Table/Table';
import Layout from '../../components/Layout';

const Users = () => (
  <Layout>
    <Table link="api/table/users" title="Users" />
  </Layout>
);

export default Users;
