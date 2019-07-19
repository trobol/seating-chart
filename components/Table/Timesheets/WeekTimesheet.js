import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
// TODO: format login and logout times and create total times columns
// BUG: something is going wrong here
const WeekTimesheetTable = ({ timesheet, week }) => {
  console.log({ timesheet }, Object.keys(timesheet[1]));
  return (
    <Table celled compact selectable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={4}>{week}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          {timesheet !== undefined ? Object.keys(timesheet[1]).map((key) => {
            if (key === 'uid' || key === 'tid') return null;
            return (<Table.HeaderCell>{key}</Table.HeaderCell>);
          }) : null}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {timesheet !== undefined ? Object.keys(timesheet).map(row => (
          <Table.Row>
            {
          Object.keys(timesheet[row]).map((key) => {
            if (key === 'uid' || key === 'tid') return null;
            if (key === 'login' || key === 'logout') return <Table.Cell>{moment(timesheet[row][key]).format('LLL')}</Table.Cell>;
            if (key === 'hours') return <Table.Cell>{timesheet[row][key].toFixed(2)}</Table.Cell>;
            return (<Table.Cell>{timesheet[row][key]}</Table.Cell>);
          })
          }
          </Table.Row>
        )) : <div />}
      </Table.Body>
    </Table>
  );
};

WeekTimesheetTable.propTypes = {
  timesheet: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    hours: PropTypes.number,
  })).isRequired,
  week: PropTypes.string.isRequired,
};

export default WeekTimesheetTable;
