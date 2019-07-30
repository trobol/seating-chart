import { useState, useEffect } from 'react';
import { Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const UserReservationModal = ({ user }) => {
  const [reservations, setReservations] = useState({});
  useEffect(() => {
    Promise.resolve(axios.get('/api/users/reservations'));
  });
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
