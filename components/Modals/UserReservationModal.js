import { useState } from 'react';
import {
  Form, Modal,
} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import useInterval from '../Util';
import UserReservationTable from '../Table/User/Reservation';


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
        <UserReservationTable />
        <Form>
          {'IDK YET'}
        </Form>
      </Modal.Description>
    </>
  );
};

export default UserReservationModal;
