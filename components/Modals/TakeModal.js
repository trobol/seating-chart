import {
  Modal, ModalActions, Header, Form, Button,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TakeModal = ({ open, setOpen }) => {
  const [seats, setSeats] = useState([]);
  const [seat, setSeat] = useState(0);
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
  return (
    <>
      <Header>Take Seat</Header>
      <Form>
        <Form.Select fluid label="Seat" options={seats} onChange={(_e, d) => setSeat(d.value)} required />
      </Form>
      <ModalActions>
        <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="green" onClick={handleSumbit}>Submit</Button>
      </ModalActions>
    </>
  );
};

TakeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default TakeModal;
