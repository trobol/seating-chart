import {
  Modal, ModalActions, Header, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ReturnModal = ({ open, setOpen, seat }) => {
  const handleSumbit = () => {
    axios.post('/api/seat/return', { seat }).then(res => console.log(res));
    setOpen(false);
  };
  return (
    <Modal open={open} size="tiny">
      <Header>Return Seat</Header>
      <Modal.Description>Would you like to return your seat?</Modal.Description>
      <ModalActions>
        <Button color="red" onClick={() => setOpen(false)}>No</Button>
        <Button color="green" onClick={handleSumbit}>Yes</Button>
      </ModalActions>
    </Modal>
  );
};

ReturnModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  seat: PropTypes.number.isRequired,
};

export default ReturnModal;
