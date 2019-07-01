import Layout from '../../components/Layout';
import AdminReservationTable from '../../components/Table/Admin/Reservation';
import HoursByMonth from '../../components/Chart/HoursByMonth';


const Reservations = () => (
  <Layout>
    <AdminReservationTable />
    <HoursByMonth />
  </Layout>
);

export default Reservations;
