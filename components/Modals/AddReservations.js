import {
  Button, Header, Modal, ModalActions, ModalDescription, Form, FormField, FormInput, FormSelect, Search, FormGroup, FormTextArea, Message,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import UserSearch from '../Form/AddReservationsForm/UserSearch';
import StartEndGroup from '../Form/AddReservationsForm/StartEndGroup';

// https://react.semantic-ui.com/modules/search/#types-standard

const weekdays = [
  { key: 1, text: 'Monday', value: 1 },
  { key: 2, text: 'Tuesday', value: 2 },
  { key: 3, text: 'Wednesday', value: 3 },
  { key: 4, text: 'Thursday', value: 4 },
  { key: 5, text: 'Friday', value: 5 },
  { key: 6, text: 'Saturday', value: 6 },
  { key: 7, text: 'Sunday', value: 7 },
];

// TODO: Make this a request to the server from number of seats
const seats = Array.from(Array(32), (x, index) => ({ key: (index + 1), text: `${index + 1}`, value: `${index + 1}` }));

const AddReservationModal = ({ open, setOpen }) => {
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [seat, setSeat] = useState(null);
  const [user, setUser] = useState({});
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [weekday, setWeekday] = useState(null);
  const [expires, setExpires] = useState(new Date());
  const [reason, setReason] = useState('');

  // TODO: Data Validation
  const handleSumbit = () => {
    console.log('submitting data');
    const postData = {
      uid: user.id, sid: seat, start, end, weekday, expires, reason,
    };
    // Unable to post using the post body with axios others were having the same issues
    // I used params and the api reflects those changes
    Promise.resolve(axios({ method: 'post', url: '/api/admin/reservations', params: postData }))
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setOpen(false);
  };

  return (
    <>
      <Header>Add Reservation</Header>
      <ModalDescription>
        <Form>
          <FormSelect fluid label="Seat" placeholder="Seat" options={seats} onChange={e => setSeat(e.target.innerText)} required />
          <FormGroup widths="equal">
            <FormField>
              <UserSearch value={[value, setValue]} searchResults={[searchResults, setSearchResults]} user={[user, setUser]} />
            </FormField>
            <FormField>
              <input readOnly value={user.title} required />
              <input hidden value={user.id} required />
            </FormField>
          </FormGroup>
          <StartEndGroup start={[start, setStart]} end={[end, setEnd]} weekday={[weekday, setWeekday]} />
          <FormGroup label="Expiration" widths="equal">
            <FormInput label="Expiration Date" type="date" required onChange={({ target }) => setExpires(target.valueAsDate)} />
          </FormGroup>
          <FormTextArea label="Reason" required onChange={e => setReason(e.target.value)} />
        </Form>
      </ModalDescription>
      <ModalActions>
        <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit" color="green" onClick={handleSumbit}>Submit</Button>
      </ModalActions>
    </>
  );
};

AddReservationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddReservationModal;
