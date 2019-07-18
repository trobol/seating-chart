import {
  Grid, Segment, Menu, Divider,
} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import WeekTimesheetTable from './WeekTimesheet';
import AdminUserTimesheet from './AdminUserTimesheet';

const AdminTimesheet = () => {
  console.log(moment().startOf('week').add(1, 'days').format('MMM Do YYYY'));
  const [timesheets, setTimesheets] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(moment().startOf('week').add(1, 'days').format('MMM Do YYYY'));
  const [users, setUsers] = useState(null);
  const handleItemClick = (e, { name }) => setSelectedWeek(name);
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/timesheets/')).then((res) => {
      console.log(res.data.result);
      setTimesheets(res.data.result);
    });
  }, []);
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/timesheets/user/')).then((res) => {
      console.log(res.data.result);
      setUsers(res.data.result);
    });
  }, []);
  return (
    <>
      <Grid className="timesheet__grid" style={{ width: '90vw', paddingLeft: '5vw' }}>
        <Grid.Column width={4} style={{ paddingBottom: '0px' }}>
          <Menu fluid vertical tabular style={{ maxHeight: '100vh', overflowY: 'auto' }} className="timesheet__side">
            {timesheets !== null
              ? Object.keys(timesheets).map(week => <Menu.Item key={week} name={week} active={selectedWeek === week} onClick={handleItemClick}></Menu.Item>)
              : <div />
            }
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12} style={{ paddingBottom: '0px' }}>
          <Segment>
            { timesheets !== null && timesheets[selectedWeek] !== undefined
              ? <WeekTimesheetTable timesheet={timesheets[selectedWeek]} week={selectedWeek} />
              : <div />
            }
            <Divider />
            {users
              ? <AdminUserTimesheet user={users[1]} />
              : <div />
            }
          </Segment>
        </Grid.Column>
      </Grid>
      <style>{'.timesheet__side::-webkit-scrollbar{display:none}'}</style>
    </>
  );
};

export default AdminTimesheet;
