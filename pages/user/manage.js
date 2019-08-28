import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Menu } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import EditUserForm from '../../components/Form/EditUser';
import UserReservationTable from '../../components/Table/User/Reservation';
import UserTimesheetTable from '../../components/Table/User/Timesheet';
import { BackgroundColor } from '../../components/Constants';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const Manage = () => {
  const [user, setUser] = useState({});
  const [majors, setMajors] = useState([]);
  const [projects, setProjects] = useState([]);

  // Users Effect
  useEffect(() => {
    Promise.all(
      [axios.get('/api/user'),
      axios.get('/api/users/get-majors'),
      axios.get('/api/users/get-projects')],
    ).then((res) => {
      setUser(res[0].data.user);
      setMajors(res[1].data.majors);
      setProjects(res[2].data.projects);
      console.log(res[0].data.user);
      console.log(res[1].data.majors);
      console.log(res[2].data.projects);
    });
  }, []);

  return (
    <Layout>
      <Menu pointing secondary className="user__menu">
        <img src="/static/lcdi_banner.png" alt="LCDI BANNER" style={{ paddingLeft: '1vw', paddingRight: '1vw' }} />
        <Menu.Menu position="right">
          <Menu.Item
            name="return"
            link
            href="/"
          />
        </Menu.Menu>
      </Menu>
      <div className="user__manage">
        <Card fluid className="user__manage__information">
          <h1>User Information</h1>
          <Card.Content>
            <EditUserForm user={user} />
          </Card.Content>
        </Card>
        <Card fluid className="user__manage__reservations">
          <h1>User Reservations</h1>
          <Card.Content>
            <UserReservationTable />
          </Card.Content>
        </Card>

        <Card fluid className="user__manage__timesheets">
          <h1>User Timesheets</h1>
          <Card.Content>
            <UserTimesheetTable />
          </Card.Content>
        </Card>

      </div>
      <style>
        {`

        .user__menu{
          background-color: white !important;
        }
        @media only screen and (min-width: 1300px) {
          .user__manage{
            height: 95vh;
            top: 2.5vh;
            display: grid;
            grid-template-columns: 1vw 1fr 1fr 1fr 1vw;
            grid-column-gap: 1%;
            grid-template-areas: ". information reservation timesheets ."
          }
          .user__manage * {
            margin: 0px !important;
          }
          .user__manage__information{
            grid-area: information;
          }
          .user__manage__reservations{
            grid-area: reservation;
          }
          .user__manage__timesheets{
            grid-area: timesheets;
          }
        }

        
        `}
      </style>
    </Layout>
  );
};
export default Manage;
