import { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableRow, TableCell, Button, Icon, Search,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import _ from 'lodash';
import Layout from '../../components/Layout';
import DeleteModal from '../../components/Modals/DeleteModal';
import { EditUserModal, AddUserModal } from '../../components/Modals';

const Users = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const resetState = () => {
    setIsLoading(false);
    setValue('');
    setSearchResults([]);
    setFilterData(data);
  };
  const deleteAction = () => {
    // Delete a User
  };
  const handleEditButton = () => setEditModal(true);
  const handleDeleteButton = () => setDeleteModal(true);
  const handleResultSelect = () => resetState();
  const handleSearchChange = (_e, obj) => setValue(obj.value);
  // Gets initial data
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const { fields, results } = res.data.response;
      // console.log(fields);
      setData(results);
      setFilterData(results);
      setColumns(fields.map(column => ({ title: column.name, field: column.name })));
      setSearchData(results.map(row => ({
        id: row.idusers,
        title: row.name,
        description: row.pronoun,
        image: `/static/users/${row.image}.jpg`,
      })));
    });
  }, []);
  // Display correct information on search
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (value.length < 1) return resetState();
    const re = new RegExp(_.escapeRegExp(value), 'i');
    const isSearchMatch = r => re.test(r.title);
    const isTableData = r => re.test(r.name);
    setSearchResults(_.filter(searchData, isSearchMatch));
    setFilterData(_.filter(filterData, isTableData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useEffect(() => { console.log('selected user changed'); }, [selectedUser]);
  if (data !== null && data !== undefined && columns !== null && columns !== undefined) {
    return (
      <Layout>
        <Table celled compact selectable sortable>
          <TableHeader>
            <TableRow>
              <Table.HeaderCell colSpan={columns.length - 1}>Users</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">
                <Search
                  loading={isLoading}
                  onResultSelect={handleResultSelect}
                  onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                  results={searchResults}
                  value={value}
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
                    <Button id={row.idusers} icon onClick={handleEditButton}><Icon name="edit" /></Button>
                    <Button id={row.idusers} icon onClick={handleDeleteButton}><Icon name="delete" /></Button>
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
      </Layout>
    );
  }
  return (<Layout />);
};

export default Users;
