import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AdminUserTimesheet = ({ user }) => {
  console.log({ user });
  return (
    <Table celled compact selectable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={2}>{user.name}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Week</Table.HeaderCell>
          <Table.HeaderCell>Hours</Table.HeaderCell>
        </Table.Row>

      </Table.Header>
      { Object.keys(user.times).map(key => (
        <Table.Row>
          <Table.Cell>{key}</Table.Cell>
          <Table.Cell>{user.times[key]}</Table.Cell>
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
