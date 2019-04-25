import Table from '../../components/Table/Table';
import Layout from '../../components/Layout';

const Admin = () => (
  <Layout>
    <p> Admin Site </p>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <Table url="api/table/reservations" />
  </Layout>
);

export default Admin;
