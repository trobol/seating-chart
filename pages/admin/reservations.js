import { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableRow, TableCell,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import Layout from '../../components/Layout';
import DeleteModal from '../../components/Modals/DeleteModal';
import AddReservationModal from '../../components/Modals/AddReservations';
import ActionModal from '../../components/Table/Action';
import SearchAction from '../../components/Table/Search';

const Weekday = (day) => {
  switch (day) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    case 7:
      return 'Sunday';
    default:
      return '';
  }
};

const Reservations = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);
  const deleteAction = (row) => {
    Promise.resolve(axios.post(`/api/admin/reservations/${row.id}`)).then(res => console.log(res));
  };
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/reservations/')).then((res) => {
      const { fields, results } = res.data.response;
      setData(results);
      setColumns(fields.map(column => ({ title: column.name, field: column.name })));
    });
  }, []);
  if (data !== null && data !== undefined && columns !== null && columns !== undefined) {
    return (
      <Layout>
        <Table celled compact selectable sortable>
          <TableHeader>
            <TableRow>
              <Table.HeaderCell colSpan={columns.length - 1}>Reservations</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">
                <SearchAction
                  data={data}
                  updateSearchData={() => data.map(row => ({
                    id: row.idusers,
                    title: row.name,
                    description: row.weekday,
                    image: row.image,
                  }))}
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
              Object.keys(row).map((key) => {
                if (key === 'expires') {
                  return (<TableCell>{(new Date(row[key])).toLocaleDateString()}</TableCell>);
                } if (key === 'weekday') {
                  return (<TableCell>{Weekday(row[key])}</TableCell>);
                } if (key === 'id');
                return (<TableCell>{row[key]}</TableCell>);
              })
            }
                <TableCell>
                  <ActionModal icon="delete" setOpen={setDeleteModal}>
                    <DeleteModal open={deleteModal} setOpen={setDeleteModal} deleteAction={deleteAction} data={row} />
                  </ActionModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={columns.length + 1}>
                <ActionModal icon="time" title="Add Reservation" setOpen={setAddModal}>
                  <AddReservationModal open={addModal} setOpen={setAddModal} />
                </ActionModal>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <style>{'.ui.table{width:90%; margin-left:5%}'}</style>
      </Layout>
    );
  }
  return (<Layout />);
};

export default Reservations;
