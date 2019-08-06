import { useState } from 'react';
import {
  Table, TableCell, Button, Message,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import useInterval from '../../Util';


const UserReservationTable = () => {
  const [data, setData] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const deleteAction = (row) => {
    Promise.resolve(axios.post(`/api/users/reservations/${row.id}`));
  };
  useInterval(() => {
    Promise.resolve(axios.get('/api/users/reservations/')).then((res) => {
      const { result } = res.data;
      console.log({ result, data });
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
              <Table.HeaderCell colSpan={Object.keys(data[0]).length}>Reservations</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              {Object.keys(data[0]).map((key => <Table.HeaderCell>{key}</Table.HeaderCell>))}
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
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={Object.keys(data[0]).length}>
                <Button icon="time" content="Add Reservation" />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      ) : (<Message content="You have no reservations" />)}
      <style>{'.ui.table{width:90%; margin-left:5%}'}</style>
    </>
  );
};

export default UserReservationTable;
