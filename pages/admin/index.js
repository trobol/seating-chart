import { Card } from 'semantic-ui-react';
import { HoursbyMonth, PronounsChart } from '../../components/Chart';
import Layout from '../../components/Layout';
import { HoursWorked } from '../../components/Statistics';
import { ActivityFeed } from '../../components/Feed';

const Admin = () => (
  <>
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
    <HoursbyMonth />
    <PronounsChart />
    <ActivityFeed />
    <style>
      {`
    .stats__container{
      width: 100vw;
      display:flex;
      justify-content: space-evenly;
    }
    .stats__container > *{
      margin:0px;
    }
  `}
    </style>
  </>

);

export default Admin;
