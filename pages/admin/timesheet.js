import { Grid, Menu, Segment } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Layout from '../../components/Layout';
import WeekTimesheetTable from '../../components/Table/Timesheets/WeekTimesheet';

const Timesheets = () => {
  const [timesheets, setTimesheets] = useState(moment().format('MMM Do YYYY'));
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/timesheets')).then((res) => {
      Object.keys(res.data.result).map(week => console.log(week));
      console.log(moment().format('MMM Do YYYY'));
      setTimesheets(res.data.result);
      console.log(res.data.result);
    });
  }, []);

  return (
    <Layout>
      <Grid className="timesheet__grid" style={{ width: '90vw', paddingLeft: '5vw' }}>
        <Grid.Column width={4} style={{ paddingBottom: '0px' }}>
          <Menu fluid vertical tabular style={{ maxHeight: '100vh', overflowY: 'auto' }} className="timesheet__side">
            {timesheets !== null
              ? Object.keys(timesheets).map(week => <Menu.Item key={week} name={week} active={activeItem === week} onClick={handleItemClick}></Menu.Item>)
              : <div />}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12} style={{ paddingBottom: '0px' }}>
          <Segment>
            <WeekTimesheetTable timesheet={timesheets[activeItem]} week={activeItem} />
          </Segment>
        </Grid.Column>
      </Grid>
      <style>{'.timesheet__side::-webkit-scrollbar{display:none}'}</style>
    </Layout>
  );
};

export default Timesheets;
