import { Card } from 'semantic-ui-react';
import { HoursbyMonth, PronounsChart } from '../../components/Chart';
import { HoursWorked } from '../../components/Statistics';
import { ActivityFeed } from '../../components/Feed';
import Layout from '../../components/Layout';

Layout;
const Admin = () => (
  <Layout>
    <div className="stats__container">
      <Card>
        <HoursWorked length="day" />
      </Card>
      <Card>
        <HoursWorked length="week" />
      </Card>
      <Card>
        <HoursWorked length="month" />
      </Card>
    </div>
    <div className="charts__container">
      <HoursbyMonth />
      <PronounsChart />
    </div>
    <ActivityFeed />
    <style>
      {`
    .charts__container{
      width: 100vw;
      display:flex;
      justify-content: space-evenly;
    }
    .stats__container{
      width: 100vw;
      display:flex;
      justify-content: space-evenly;
    }
    .stats__container > *{
      margin:0px !important;
    }
  `}
    </style>
  </Layout>

);

export default Admin;
