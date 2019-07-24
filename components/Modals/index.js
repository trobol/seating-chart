import { Modal } from 'semantic-ui-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TakeModal from './TakeModal';
import ReturnModal from './ReturnModal';
import EditUserModal from './EditUserModal';
import AddReservationModal from './AddReservations';
import CreateUserModal from './CreateUserModal';
import DeleteModal from './DeleteModal';

const BaseModal = ({
  children, active, setActive, open, setOpen, action, data,
}) => {
  const modalOptions = [
    { name: 'take', modal: (<TakeModal open={open} setOpen={setOpen} />) },
    { name: 'return', modal: (<ReturnModal open={open} setOpen={setOpen} seat={data} />) },
    { name: 'add-reservations', modal: (<AddReservationModal open={open} setOpen={setOpen} />) },
    { name: 'delete', modal: (<DeleteModal open={open} setOpen={setOpen} deleteAction={action} data={data} />) },
    { name: 'create-user', modal: (<CreateUserModal open={open} setOpen={setOpen} />) },
    { name: 'edit-user', modal: (<EditUserModal open={open} setOpen={setOpen} user={data} />) },
  ];
  useEffect(() => {
    console.log({ active, children }, modalOptions.filter(option => option.name === active),
      modalOptions.map(({ name, modal }) => (name === active ? modal : null)), !_.isNull(children));
    if (!_.isEmpty(modalOptions.filter(option => option.name === active))) setOpen(true);
    else if (!_.isNull(children)) setOpen(true);
    else setOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  useEffect(() => {
    console.log({ open });
    if (open === false) {
      setActive('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <Modal open={open}>
      {modalOptions.map(({ name, modal }) => (name === active ? modal : <div />))}
      {children}
    </Modal>
  );
};

BaseModal.propTypes = {
  children: PropTypes.node,
  active: ('take' || 'return' || 'add-reservations' || 'delete' || 'creat-user' || 'edit-user' || 'custom'),
  setActive: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  action: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any,
};

BaseModal.defaultProps = {
  children: null,
  active: null,
  action: null,
  data: null,
};

export {
  ReturnModal,
  BaseModal,
  EditUserModal,
  CreateUserModal,
};
