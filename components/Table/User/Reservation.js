import { useState } from 'react';
import {
  Table, TableCell, Button, Message,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import useInterval from '../../Util';
import { BaseModal } from '../../Modals';

const UserReservationTable = () => {
  const [data, setData] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const deleteAction = (row) => {
    Promise.resolve(axios.post(`/api/users/reservations/${row.id}`));
  };
  useInterval(() => {
    Promise.resolve(axios.get('/api/users/reservations/')).then((res) => {
      const { result } = res.data;
      if (!_.isEqual(result, data)) {
        setData(result);
      }
    });
  }, 1000);
  return (
    <>
      {data !== null && data !== undefined ? (
        <Table celled compact selectable sortable>
          <Table.Header>
            <Table.Row>
              {Object.keys(data[0]).map((key => <Table.HeaderCell key={key}>{key}</Table.HeaderCell>))}
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
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
                <Table.Cell><Button icon="delete" onClick={() => setActiveModal('delete')} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={Object.keys(data[0]).length + 1}>
                <Button icon="time" content="Add Reservation" onClick={() => setActiveModal('add-reservations')} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      ) : (<Message content="You have no reservations" />)}
      <BaseModal
        open={open}
        setOpen={setOpen}
        setActive={setActiveModal}
        active={activeModal}
        action={deleteAction}
        data={selectedReservation}
      />
    </>
  );
};

export default UserReservationTable;
