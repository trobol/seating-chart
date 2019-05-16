import { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableRow, TableCell, Button, Icon, Modal, ModalActions,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import Layout from '../../components/Layout';
import DeleteModal from '../../components/Modals/DeleteModal';
import AddReservationModal from '../../components/Modals/AddReservations';

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
        <Modal open={addModal}>
          <AddReservationModal />
          <ModalActions />
        </Modal>
      </Layout>
    );
  }
  return (<Layout />);
};

export default Reservations;
