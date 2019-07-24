import { useState, useEffect } from 'react';
import {
  Table, Button, Icon,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { EditUserModal, BaseModal } from '../../Modals';
import SearchAction from '../Search';

const AdminUserTable = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const deleteAction = () => {
    Promise.resolve(axios.post(`/api/admin/user/${selectedUser.idusers}`))
      .then((res) => {
        console.log(res);
      });
  };
    // Gets initial data
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const { results } = res.data.response;
      setData(results);
      setFilterData(results);
      setColumns(Object.keys(results[0]).map(key => ({ title: key, field: key })));
      // setColumns(fields.map(column => ({ title: column.name, field: column.name })));
    });
  }, []);

  // useEffect(() => { console.log({ selectedUser }); }, [selectedUser]);
  if (data !== null && data !== undefined && columns !== null && columns !== undefined) {
    return (
      <>
        <Table celled compact selectable sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={columns.length - 1}>Users</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">
                <SearchAction
                  data={data}
                  updateSearchData={() => data.map(row => ({
                    id: row.idusers,
                    title: row.name,
                    description: row.pronoun,
                    image: row.path,
                  }))}
                />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              {columns.map(({ title }) => <Table.HeaderCell key={title}>{title}</Table.HeaderCell>)}
              <Table.HeaderCell>actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
                filterData.map(row => (
                  <Table.Row onMouseEnter={() => setSelectedUser(data[row.idusers - 1])} key={row.idusers}>
                    {
                      Object.keys(row).map((key) => {
                        if (key === 'account_created') {
                          const d = new Date(row[key]);
                          return (<Table.Cell>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</Table.Cell>);
                        } if (key === 'id');
                        return (<Table.Cell>{row[key]}</Table.Cell>);
                      })
                    }
                    <Table.Cell>
                      <Button id={row.idusers} icon onClick={() => setActiveModal('edit-user')}><Icon name="edit" /></Button>
                      <Button id={row.idusers} icon onClick={() => setActiveModal('delete')}><Icon name="delete" /></Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={columns.length + 1}>
                <Button floated="right" icon labelPosition="left" primary size="small" onClick={() => setActiveModal('create-user')}>
                  <Icon name="user" />
                  {'Add User'}
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <style>{'.ui.table{width:90%; margin-left:5%}'}</style>
        <BaseModal
          open={open}
          setOpen={setOpen}
          active={activeModal}
          setActive={setActiveModal}
          action={deleteAction}
          data={selectedUser}
        />
      </>
    );
  }
  return (<div />);
};

export default AdminUserTable;
