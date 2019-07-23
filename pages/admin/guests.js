import { Modal, Button } from 'semantic-ui-react';
import {
  useState, useEffect,
} from 'react';
import _ from 'lodash';
import Layout from '../../components/Layout';

const ModalOne = ({ open, setOpen }) => (
  <>
    <h1>One</h1>
    <Button onClick={() => { setOpen(false); }}>Close</Button>
  </>
);

const ModalTwo = ({ open, setOpen }) => (
  <>
    <h1>Two</h1>
    <Button onClick={() => { setOpen(false); }}>Close</Button>
  </>
);
const ModalThree = ({ open, setOpen }) => (
  <>
    <h1>Three</h1>
    <Button onClick={() => { setOpen(false); }}>Close</Button>
  </>

);

const BaseModal = ({
  children, active, open, setOpen,
}) => {
  const modalOptions = [
    { name: 'one', modal: (<ModalOne open={open} setOpen={setOpen} />) },
    { name: 'two', modal: (<ModalTwo open={open} setOpen={setOpen} />) },
    { name: 'three', modal: (<ModalThree open={open} setOpen={setOpen} />) },
  ];
  useEffect(() => {
    if (!_.isEmpty(modalOptions.filter(option => option.name === active))) setOpen(true);
    else setOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return (
    <Modal open={open}>
      {modalOptions.map(({ name, modal }) => (name === active ? modal : null))}
      {active === 'custom' ? children : null}
    </Modal>
  );
};

const Guest = () => {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  return (
    <Layout>
      <BaseModal active={activeModal} open={open} setOpen={setOpen} />
      <Button onClick={() => setActiveModal('one')}>One</Button>
      <Button onClick={() => setActiveModal('two')}>Two</Button>
      <Button onClick={() => setActiveModal('three')}>Three</Button>
      <Button onClick={() => setOpen(true)}>Open</Button>
    </Layout>
  );
};

BaseModal.propTypes = {
  active: ('one' || 'two' || 'three' || 'custom'),
};

BaseModal.defaultProps = {
  active: null,
};

export default Guest;
