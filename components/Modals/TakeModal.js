import {
  Modal, Header, Form, Button, Message,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TakeModal = ({ open, setOpen }) => {
  const [seats, setSeats] = useState([]);
  const [seat, setSeat] = useState(0);
  const [reservation, setReservation] = useState(undefined);
  const handleSumbit = () => {
    Promise.resolve(axios.post('/api/seat/take/', { seat }));
    setOpen(false);
  };
  useEffect(() => {
    Promise.resolve(axios.get('/api/seat/'))
      .then((res) => {
        if (res.data !== null && res.data.seats !== undefined) {
          console.log(res);
          setSeats(res.data.seats
            .filter(({ uid }) => uid === null)
            .map(({ sid, computerName }) => ({ key: sid, text: computerName, value: sid })));
        }
      });
  }, []);
  useEffect(() => {
    Promise.resolve(axios.get('/api/user/reservations/today')).then((res) => {
      if (res.data.reservation) {
        console.log(res.data.reservation);
        setReservation(res.data.reservation);
        setSeat(res.data.reservation.sid);
      }
    });
  }, []);
  useEffect(() => console.log({ reservation }), [reservation]);
  return (
    <>
      <Header>Take Seat</Header>
      {reservation !== undefined && reservation !== null
        ? <Message content={`You have a reservation at seat ${reservation.sid}`} />
        : <div />}
      <Form>
        <Form.Select fluid label="Seat" value={seat} options={seats} onChange={(_e, d) => setSeat(d.value)} required />
      </Form>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="green" onClick={handleSumbit}>Submit</Button>
      </Modal.Actions>
    </>
  );
};

TakeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default TakeModal;
