import { useState, useEffect } from 'react';
import { Form, Modal, Table } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import useInterval from '../Util';

const UserReservationModal = ({ user }) => {
  const [reservations, setReservations] = useState({});
  useInterval(() => {
    Promise.resolve(axios.get('/api/users/reservations'))
      .then((res) => {
        console.log({ res });
      });
  }, 1000);
  return (
    <>
      <Modal.Header> Reservations </Modal.Header>
      <Modal.Description>
        <Table />
        <Form>
          {'IDK YET'}
        </Form>
      </Modal.Description>
    </>
  );
};

export default UserReservationModal;
