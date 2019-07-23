import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
// TODO: format login and logout times and create total times columns
// BUG: something is going wrong here
const WeekTimesheetTable = ({
  timesheet, week, user, item,
}) => {
  console.log({ timesheet }, Object.keys(timesheet[1]));
  const [selectedUser, setSelectedUser] = user;
  const [activeItem, setActiveItem] = item;
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
          <Table.HeaderCell>actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {timesheet !== undefined ? Object.keys(timesheet).map(row => (
          <Table.Row onMouseEnter={() => setSelectedUser(timesheet[row].uid)}>
            {
          Object.keys(timesheet[row]).map((key) => {
            if (key === 'uid' || key === 'tid') return null;
            if (key === 'hours') return <Table.Cell onClick={() => setActiveItem('user')}>{timesheet[row][key].toFixed(2)}</Table.Cell>;
            return (<Table.Cell onClick={() => setActiveItem('user')}>{timesheet[row][key]}</Table.Cell>);
          })
          }
            <Table.Cell>
              <Button id={selectedUser} icon onClick={() => {}}><Icon name="edit" /></Button>
            </Table.Cell>
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
