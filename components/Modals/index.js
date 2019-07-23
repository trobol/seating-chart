import { Modal } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import TakeModal from './TakeModal';
import ReturnModal from './ReturnModal';
import EditUserModal from './EditUserModal';
import AddReservationModal from './AddReservations';
import CreateUserModal from './CreateUserModal';

const BaseModal = ({
 children, modalContents, open, setOpen 
}) => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    switch (modalContents) {
      case TakeModal:
        setContent(<TakeModal open={open} setOpen={setOpen} />);
        break;

      default:
        break;
    }
  }, [modalContents, open, setOpen]);
  return (
    <Modal>
      {children}
      {content}
    </Modal>
  );
};

export {
  TakeModal,
  ReturnModal,
  EditUserModal,
  AddReservationModal,
  CreateUserModal,
};
