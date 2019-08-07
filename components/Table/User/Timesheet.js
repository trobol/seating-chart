import { useState } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import { BaseModal } from '../../Modals';
import useInterval from '../../Util';

const UserTimesheetTable = () => {
  const [data, setData] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const deleteAction = (row) => {
    Promise.resolve(axios.post(`/api/users/reservations/${row.id}`));
  };

  useInterval(() => {
    Promise.resolve(axios.get('/api/users/timesheets')).then((res) => {
      const { result } = res.data;
      if (!_.isEqual(result, data)) {
        setData(result);
      }
    });
  }, 1000);

  return (
    <>
      <Table celled compact selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Week</Table.HeaderCell>
            <Table.HeaderCell>Clock-In</Table.HeaderCell>
            <Table.HeaderCell>Clock-Out</Table.HeaderCell>
            <Table.HeaderCell>Hours</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data !== null && data !== undefined ? (
            Object.keys(data).map(week => data[week].map((shift, idx) => (
              <Table.Row>
                {idx === 0
                  ? (<Table.Cell length={data[week].length}>{week}</Table.Cell>)
                  : (<div />)}
                {Object.keys(shift).map((key) => {
                  if (key === 'uid' || key === 'tid') return null;
                  return (<Table.Cell>{shift[key]}</Table.Cell>);
                })}
              </Table.Row>
            )))
          ) : (
            <div />
          )}
        </Table.Body>
      </Table>
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

export default UserTimesheetTable;
