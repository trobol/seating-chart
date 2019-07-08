import Layout from '../../components/Layout';
import AdminReservationTable from '../../components/Table/Admin/Reservation';
import HoursByMonth from '../../components/Chart/HoursByMonth';
import ActivityFeed from '../../components/Feed/ActivityFeed';


const Reservations = () => (
  <Layout>
    <AdminReservationTable />
    <HoursByMonth />
    <ActivityFeed />
  </Layout>
);

export default Reservations;
