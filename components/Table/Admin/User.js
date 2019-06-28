import { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableRow, TableCell, Button, Icon,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import DeleteModal from '../../Modals/DeleteModal';
import { EditUserModal, AddUserModal } from '../../Modals';
import SearchAction from '../Search';

const AdminUserTable = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const deleteAction = () => {
    Promise.resolve(axios.post(`/api/admin/user/${selectedUser.idusers}`))
      .then((res) => {
        console.log(res);
      });
  };
    // Gets initial data
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const { fields, results } = res.data.response;
      setData(results);
      setFilterData(results);
      setColumns(fields.map(column => ({ title: column.name, field: column.name })));
    });
  }, []);

  useEffect(() => { console.log({ selectedUser }); }, [selectedUser]);
  if (data !== null && data !== undefined && columns !== null && columns !== undefined) {
    return (
      <>
        <Table celled compact selectable sortable>
          <TableHeader>
            <TableRow>
              <Table.HeaderCell colSpan={columns.length - 1}>Users</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">
                <SearchAction
                  data={data}
                  updateSearchData={() => data.map(row => ({
                    id: row.idusers,
                    title: row.name,
                    description: row.pronoun,
                    image: `/static/users/${row.image}.jpg`,
                  }))}
                />
              </Table.HeaderCell>
            </TableRow>
            <TableRow>
              {columns.map(({ title }) => <Table.HeaderCell key={title}>{title}</Table.HeaderCell>)}
              <Table.HeaderCell>actions</Table.HeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                filterData.map(row => (
                  <TableRow onMouseEnter={() => setSelectedUser(data[row.idusers - 1])} key={row.idusers}>
                    {
                      Object.keys(row).map((key) => {
                        if (key === 'account_created') {
                          const d = new Date(row[key]);
                          return (<TableCell>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</TableCell>);
                        } if (key === 'id');
                        return (<TableCell>{row[key]}</TableCell>);
                      })
                    }
                    <TableCell>
                      <Button id={row.idusers} icon onClick={() => setEditModal(true)}><Icon name="edit" /></Button>
                      <Button id={row.idusers} icon onClick={() => setDeleteModal(true)}><Icon name="delete" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={columns.length + 1}>
                <Button floated="right" icon labelPosition="left" primary size="small" onClick={() => setAddModal(true)}>
                  <Icon name="user" />
                  {'Add User'}
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <style>{'.ui.table{width:90%; margin-left:5%}'}</style>
        {selectedUser
          ? (
            <>
              <EditUserModal open={editModal} setOpen={setEditModal} user={selectedUser} />
              <DeleteModal open={deleteModal} setOpen={setDeleteModal} deleteAction={deleteAction} data={selectedUser} />
            </>
          )
          : null}
        <AddUserModal open={addModal} setOpen={setAddModal} />
      </>
    );
  }
  return (<div />);
};

export default AdminUserTable;
