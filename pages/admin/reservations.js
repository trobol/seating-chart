import Layout from '../../components/Layout';
import AdminReservationTable from '../../components/Table/Admin/Reservation';
import HoursByMonth from '../../components/Chart/HoursByMonth';
import ActivityFeed from '../../components/Feed/ActivityFeed';
import PronounsChart from '../../components/Chart/Pronouns';


const Reservations = () => (
  <Layout>
    <AdminReservationTable />
    <HoursByMonth />
    <PronounsChart />
    <ActivityFeed />
  </Layout>
);

export default Reservations;
