import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
// TODO: format login and logout times and create total times columns
const WeekTimesheetTable = ({ timesheet, week }) => {
  console.log({ timesheet });
  return (
    <Table celled compact selectable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={4}>{week}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          {timesheet !== undefined ? Object.keys(timesheet[0]).map((key) => {
            if (key === 'uid' || key === 'tid') return null;
            return (<Table.HeaderCell>{key}</Table.HeaderCell>);
          }) : null}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {timesheet !== undefined ? timesheet.map(row => (
          <Table.Row>
            {
          Object.keys(row).map((key) => {
            if (key === 'uid' || key === 'tid') return null;
            if (key === 'login' || key === 'logout') return <Table.Cell>{moment(row[key]).format('LLL')}</Table.Cell>;
            if (key === 'hours') return <Table.Cell>{row[key].toFixed(2)}</Table.Cell>;
            return (<Table.Cell>{row[key]}</Table.Cell>);
          })
          }
          </Table.Row>
        )) : <div />}
      </Table.Body>
    </Table>
  );
};

WeekTimesheetTable.propTypes = {
  week: PropTypes.string.isRequired,
};

export default WeekTimesheetTable;
