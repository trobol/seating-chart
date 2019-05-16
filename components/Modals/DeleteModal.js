import {
  Header, ModalDescription,
} from 'semantic-ui-react';

const DeleteModal = () => (
  <>
    <Header>Delete</Header>
    <ModalDescription>
      <Header> Are you sure you want to delete this item?</Header>
      <p>{'Once deleted this action can\'t be undone'}</p>
    </ModalDescription>
  </>
);

export default DeleteModal;
