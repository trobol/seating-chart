import {
  Modal, ModalActions, Header, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect } from 'react';

const ReturnModal = ({ open, setOpen, seat }) => {
  const handleSumbit = () => {
    axios.post('/api/seat/return', { seat }).then(res => console.log(res));
    setOpen(false);
  };
  useEffect(() => console.log({ seat }), [seat]);
  return (
    <>
      <Header>Return Seat</Header>
      <Modal.Description>Would you like to return your seat?</Modal.Description>
      <ModalActions>
        <Button color="red" onClick={() => setOpen(false)}>No</Button>
        <Button color="green" onClick={handleSumbit}>Yes</Button>
      </ModalActions>
    </>
  );
};

ReturnModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  seat: PropTypes.oneOfType(
    [PropTypes.number, PropTypes.any],
  ).isRequired,
};

export default ReturnModal;
