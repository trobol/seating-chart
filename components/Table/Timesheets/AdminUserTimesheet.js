import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AdminUserTimesheet = ({ user, week, item }) => {
  const [selectedWeek, setSelectedWeek] = week;
  const [activeItem, setActiveItem] = item;
  return (
    <Table celled compact selectable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={3}>{user.name}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Week</Table.HeaderCell>
          <Table.HeaderCell>Hours</Table.HeaderCell>
          <Table.HeaderCell>actions</Table.HeaderCell>
        </Table.Row>

      </Table.Header>
      { Object.keys(user.times).map(key => (
        <Table.Row onMouseEnter={() => setSelectedWeek(key)}>
          <Table.Cell onClick={() => setActiveItem('week')}>{key}</Table.Cell>
          <Table.Cell onClick={() => setActiveItem('week')}>{user.times[key].toFixed(2)}</Table.Cell>
          <Table.Cell>
            <Button id={selectedWeek} icon onClick={() => {}}><Icon name="edit" /></Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table>
  );
};

AdminUserTimesheet.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    times: PropTypes.arrayOf(PropTypes.any),
  }),
};

AdminUserTimesheet.defaultProps = {
  user: null,
};

export default AdminUserTimesheet;
