import { useState } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import useInterval from '../../Util';

// TODO: Pagination of timesheet
const UserTimesheetTable = () => {
  const [data, setData] = useState(null);

  useInterval(() => {
    Promise.resolve(axios.get('/api/users/timesheets')).then((res) => {
      const { result } = res.data;
      if (!_.isEqual(result, data)) {
        setData(result);
      }
    });
  }, 1000);

  return (
    <>
      <Table celled compact selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Week</Table.HeaderCell>
            <Table.HeaderCell>Clock-In</Table.HeaderCell>
            <Table.HeaderCell>Clock-Out</Table.HeaderCell>
            <Table.HeaderCell>Hours</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data !== null && data !== undefined ? (
            Object.keys(data).map(week => data[week].map((shift, idx) => (
              <Table.Row>
                {idx === 0
                  ? (<Table.Cell length={data[week].length}>{week}</Table.Cell>)
                  : (<div />)}
                {Object.keys(shift).map((key) => {
                  if (key === 'uid' || key === 'tid') return null;
                  if (key === 'hours') return (<Table.Cell>{shift[key].toFixed(2)}</Table.Cell>);
                  if (key === 'login' || key === 'logout') return (<Table.Cell>{moment(shift[key]).format('MM/DD/YY hh:mma')}</Table.Cell>);
                  return (<Table.Cell>{shift[key]}</Table.Cell>);
                })}
              </Table.Row>
            )))
          ) : (
            <div />
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default UserTimesheetTable;
