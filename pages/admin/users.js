import { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableRow, TableCell, Button, Icon, Modal, ModalActions, Search,
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
  const handleResultSelect = () => resetState();
  const handleSearchChange = (_e, obj) => {
    setValue(obj.value);
  };
  // Gets initial data
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const { fields, results } = res.data.response;
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
  if (data !== null && data !== undefined && columns !== null && columns !== undefined) {
    return (
      <Layout>
        <Table celled compact selectable sortable padded className="Table">
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
                <TableRow>
                  {
                    Object.keys(row).map(key => <TableCell>{row[key]}</TableCell>)
                  }
                  <TableCell>
                    <Button icon onClick={() => setEditModal(true)}><Icon name="edit" /></Button>
                    <Button icon onClick={() => setDeleteModal(true)}><Icon name="delete" /></Button>
                    <EditUserModal open={editModal} setOpen={setEditModal} user={row} />
                    <DeleteModal open={deleteModal} setOpen={setDeleteModal} deleteAction={deleteAction} data={row} />
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
        <AddUserModal open={addModal} setOpen={setAddModal} />
      </Layout>
    );
  }
  return (<Layout />);
};

export default Users;
