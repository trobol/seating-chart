import {
  Button, Header, Modal, ModalActions, ModalDescription,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DeleteModal = ({
  open, setOpen, deleteAction, data,
}) => (
  <>
    <Header>Delete</Header>
    <ModalDescription>
      <Header> Are you sure you want to delete this item?</Header>
      <p>{'Once deleted, this action can\'t be undone'}</p>
    </ModalDescription>
    <ModalActions>
      <Button color="red" onClick={() => setOpen(false)}>No</Button>
      <Button color="green" onClick={() => { setOpen(false); deleteAction(data); }}>Yes</Button>
    </ModalActions>
  </>
);
DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};
export default DeleteModal;
