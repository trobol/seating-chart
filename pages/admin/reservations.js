import Table from '../../components/Table';
import Layout from '../../components/Layout';

const AdminReservations = () => (
  <Layout>
    <p> Admin Site </p>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <Table link="api/table/reservations" />
  </Layout>
);

export default AdminReservations;
