import Layout from '../../components/Layout';
import AdminReservationTable from '../../components/Table/Admin/Reservation';
import MyChart from '../../components/Chart';

const Reservations = () => (
  <Layout>
    <AdminReservationTable />
    <MyChart />
  </Layout>
);

export default Reservations;
