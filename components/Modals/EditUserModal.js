import {
  Button, Header, Modal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EditUserForm from '../Form/EditUser';

const EditUserModal = ({ open, setOpen, user }) => (
  <>
    <Header>Edit User</Header>
    <Modal.Content>
      <Modal.Description>
        <EditUserForm user={user} />
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={() => setOpen(false)}>Close</Button>
    </Modal.Actions>
  </>
);

EditUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  user: PropTypes.shape({
    idusers: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pronoun: PropTypes.string.isRequired,
    majors: PropTypes.string,
    projects: PropTypes.string,
    userTypes: PropTypes.string,
  }),
};

EditUserModal.defaultProps = {
  user: PropTypes.shape({
    majors: null,
    projects: null,
    userTypes: null,
  }),
};

export default EditUserModal;
