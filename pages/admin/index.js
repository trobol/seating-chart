import Table from '../../components/Table/Table';
import Layout from '../../components/Layout';

const Admin = () => (
  <Layout>
    <Table link="api/table/reservations" title="Reservations" />
  </Layout>
);

export default Admin;
