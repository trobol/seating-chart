import { HoursbyMonth, PronounsChart } from '../../components/Chart';
import Layout from '../../components/Layout';
import { HoursWorked } from '../../components/Statistics';

const Admin = () => (
  <>
    <HoursbyMonth />
    <PronounsChart />
    <HoursWorked length="week" />
  </>

);

export default Admin;
