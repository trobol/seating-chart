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
    axios.post('/api/seat/take/', { seat }).then((res) => {
      console.log({ res });
    });
    setOpen(false);
  };
  useEffect(() => {
    axios.get('/api/seat/').then((res) => {
      setSeats(res.data.filter(e => e.u_id === null).map(e => ({ key: e.idseats, text: e.computer_name, value: e.idseats })));
    });
  }, [seats]);
  return (
    <Modal open={open} size="tiny" closeOnDimmerClick>
      <Header>Take Seat</Header>
      <Form>
        <Form.Select fluid label="Seat" options={seats} onChange={(_e, d) => setSeat(d.value)} required />
      </Form>
      <ModalActions>
        <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="green" onClick={handleSumbit}>Submit</Button>
      </ModalActions>
    </Modal>
  );
};

TakeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default TakeModal;
