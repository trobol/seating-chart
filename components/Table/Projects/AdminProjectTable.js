import { Table, Button, Icon } from 'semantic-ui-react';

const AdminProjectTable = ({ users, project }) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan={4}>{project}</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        {users !== undefined ? Object.keys(users[0]).map((key) => {
          if (key === 'uid' || key === 'tid') return null;
          return (<Table.HeaderCell>{key}</Table.HeaderCell>);
        }) : null}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {users !== undefined ? Object.keys(users).map(row => (
        <Table.Row>
          {
          Object.keys(users[row]).map((key) => {
            if (key === 'uid' || key === 'tid') return null;
            return (<Table.Cell>{users[row][key]}</Table.Cell>);
          })
          }
        </Table.Row>
      )) : <div />}
    </Table.Body>
    <Table.Footer fullWidth>
      <Table.HeaderCell colSpan={2}>
        <Button floated="right" icon labelPosition="left" primary size="small" onClick={() => {}}>
          <Icon name="user" />
          {'Add User'}
        </Button>
      </Table.HeaderCell>
    </Table.Footer>
  </Table>
);

export default AdminProjectTable;
