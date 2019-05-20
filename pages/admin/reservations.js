import { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableRow, TableCell, Button, Icon, Modal, ModalActions, Search,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import _ from 'lodash';
import Layout from '../../components/Layout';
import DeleteModal from '../../components/Modals/DeleteModal';
import AddReservationModal from '../../components/Modals/AddReservations';

const Reservations = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const deleteAction = (row) => {
    Promise.resolve(axios.post(`/api/admin/reservations/${row.id}`)).then(res => console.log(res));
  };
  const resetState = () => {
    setIsLoading(false);
    setValue('');
    setSearchResults([]);
    setFilterData(data);
  };
  const handleResultSelect = () => resetState();
  const handleSearchChange = (_e, obj) => {
    setValue(obj.value);
  };
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/reservations/')).then((res) => {
      const { fields, results } = res.data.response;
      setData(results);
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
        <Table celled compact selectable sortable>
          <TableHeader>
            <TableRow>
              <Table.HeaderCell colSpan={columns.length - 1}>Reservations</Table.HeaderCell>
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
            {columns.map(({ title }) => <Table.HeaderCell key={title}>{title}</Table.HeaderCell>)}
            <Table.HeaderCell>delete</Table.HeaderCell>
          </TableHeader>
          <TableBody>
            {data.map(row => (
              <TableRow>
                {
              Object.keys(row).map(key => <TableCell>{row[key]}</TableCell>)
            }
                <TableCell>
                  <Button icon onClick={() => setDeleteModal(true)}><Icon name="delete" /></Button>
                  <Modal open={deleteModal}>
                    <DeleteModal />
                    <ModalActions>
                      <Button color="red" onClick={() => setDeleteModal(false)}>No</Button>
                      <Button color="green" onClick={() => { setDeleteModal(false); deleteAction(row); }}>Yes</Button>
                    </ModalActions>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={columns.length + 1}>
                <Button floated="right" icon labelPosition="left" primary size="small" onClick={() => setAddModal(true)}>
                  <Icon name="time" />
                  {'Add Reservation'}
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <style>{'.ui.table{width:90%; margin-left:5%}'}</style>
        <Modal open={addModal} size="small" closeOnDimmerClick>
          <AddReservationModal />
          <ModalActions />
        </Modal>
      </Layout>
    );
  }
  return (<Layout />);
};

export default Reservations;
