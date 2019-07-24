import { useState, useEffect } from 'react';
import {
  Table, TableCell, Button,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import moment from 'moment';
import Layout from '../../Layout';
import SearchAction from '../Search';
import { BaseModal } from '../../Modals';

const AdminReservationTable = () => {
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
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
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={columns.length - 1}>Reservations</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">
                <SearchAction
                  data={data}
                  updateSearchData={() => data.map(row => ({
                    key: row.idusers,
                    id: row.idusers,
                    title: row.name,
                    description: row.weekday,
                    image: row.image,
                  }))}
                />
              </Table.HeaderCell>
            </Table.Row>
            {columns.map(({ title }) => <Table.HeaderCell key={title}>{title}</Table.HeaderCell>)}
            <Table.HeaderCell>delete</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {data.map(row => (
              <Table.Row onMouseEnter={() => setSelectedReservation(data[row.id - 1])}>
                {
              Object.keys(row).map((key) => {
                if (key === 'expires') {
                  return (<TableCell>{(new Date(row[key])).toLocaleDateString()}</TableCell>);
                } if (key === 'weekday') {
                  return (<TableCell>{moment().day(row[key]).format('dddd')}</TableCell>);
                } if (key === 'id');
                return (<TableCell>{row[key]}</TableCell>);
              })
            }
                <Table.Cell>
                  <Button icon="delete" onClick={() => setActiveModal('delete')} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={columns.length + 1}>
                <Button icon="time" content="Add Reservation" onClick={() => setActiveModal('add-reservations')} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <BaseModal
          open={open}
          setOpen={setOpen}
          setActive={setActiveModal}
          active={activeModal}
          action={deleteAction}
          data={selectedReservation}
        />
        <style>{'.ui.table{width:90%; margin-left:5%}'}</style>
      </Layout>
    );
  }
  return (<Layout />);
};

export default AdminReservationTable;
