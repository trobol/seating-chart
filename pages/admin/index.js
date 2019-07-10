import { Card, Menu } from 'semantic-ui-react';
import { HoursbyMonth, PronounsChart } from '../../components/Chart';
import { HoursWorked } from '../../components/Statistics';
import { ActivityFeed } from '../../components/Feed';
import Layout from '../../components/Layout';
import TabTable from '../../components/TabTable/TabTable';

const Admin = () => (
  <Layout>
    <TabTable />
  </Layout>

);

export default Admin;
