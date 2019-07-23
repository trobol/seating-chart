import { Modal } from 'semantic-ui-react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TakeModal from './TakeModal';
import ReturnModal from './ReturnModal';
import EditUserModal from './EditUserModal';
import AddReservationModal from './AddReservations';
import CreateUserModal from './CreateUserModal';

const BaseModal = ({
  children, active, setActive, open, setOpen,
}) => {
  const modalOptions = [
    { name: 'take', modal: (<TakeModal open={open} setOpen={setOpen} />) },
    { name: 'add-reservations', modal: (<AddReservationModal open={open} setOpen={setOpen} />) },
  ];
  useEffect(() => {
    console.log({ active }, modalOptions.filter(option => option.name === active),
      modalOptions.map(({ name, modal }) => (name === active ? modal : null)));
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
  active: ('take' || 'add-reservations' || 'custom'),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

BaseModal.defaultProps = {
  children: <div />,
  active: null,

};

export {
  ReturnModal,
  BaseModal,
  EditUserModal,
  CreateUserModal,
};
