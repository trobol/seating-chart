import { useState, useEffect } from 'react';
import { Modal, Form, Checkbox } from 'semantic-ui-react';

const ForceReturnModal = ({ open, setOpen }) => {
  const [returnAll, setReturnAll] = useState(false);
  const [seat, setSeat] = useState(0);

  // TODO: Get current seats
  useEffect(() => {

  }, []);

  return (
    <>
      <Modal.Header>Force Return</Modal.Header>
      <Modal.Description>
        <Form>
          <Form.Button></Form.Button>
          <Form.Select placeholder="Seat"></Form.Select>
          <Form.Field control={Checkbox} label="Force Return All" onChange={() => console.log('changed')} />
        </Form>
      </Modal.Description>
    </>
  );
};

export default ForceReturnModal;
