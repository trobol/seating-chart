import {
  Button, Header, Modal, ModalActions, ModalDescription, Form, FormField, FormInput, FormSelect, Search, FormGroup, FormTextArea,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';

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
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [seat, setSeat] = useState(null);
  const [user, setUser] = useState({});
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [weekday, setWeekday] = useState(null);
  const [expires, setExpires] = useState(new Date());
  const [reason, setReason] = useState('');
  const resetSearchState = () => {
    setIsLoading(false);
    setValue('');
    setSearchResults([]);
  };
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
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const { results } = res.data.response;
      setUserData(results.map(row => ({
        id: row.idusers,
        title: row.name,
        description: row.pronoun,
        image: `/static/users/${row.image}.jpg`,
      })));
    });
  }, []);
  useEffect(resetSearchState, [user]);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (value.length < 1) return resetSearchState();
    const re = new RegExp(_.escapeRegExp(value), 'i');
    const isMatch = r => re.test(r.title);
    setSearchResults(_.filter(userData, isMatch));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <Modal open={open} size="small" closeOnDimmerClick>
      <Header>Add Reservation</Header>
      <ModalDescription>
        <Form>
          <FormSelect fluid label="Seat" placeholder="Seat" options={seats} onChange={e => setSeat(e.target.innerText)} required />
          <FormGroup widths="equal">
            <FormField>
              <Search
                loading={isLoading}
                onResultSelect={(e, obj) => setUser((userData.filter(s => s.id === obj.result.id))[0])}
                onSearchChange={_.debounce((e, obj) => setValue(obj.value), 500, { leading: true })}
                results={searchResults}
                value={value}
              />
            </FormField>
            <FormField>
              <input readOnly value={user.title} required />
              <input hidden value={user.id} required />
            </FormField>
          </FormGroup>
          <FormGroup widths="equal">
            <FormInput label="Start Time" type="time" onChange={e => setStart(e.target.value)} required />
            <FormInput label="End Time" type="time" onChange={e => setEnd(e.target.value)} required />
            <FormSelect fluid label="Weekday" options={weekdays} onChange={(_e, d) => setWeekday(d.value)} required />
          </FormGroup>
          <FormGroup label="Expiration" widths="equal">
            <FormInput label="Date" type="date" required onChange={({ target }) => setExpires(target.valueAsDate)} />
          </FormGroup>
          <FormTextArea label="Reason" required onChange={e => setReason(e.target.value)} />
        </Form>
      </ModalDescription>
      <ModalActions>
        <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit" color="green" onClick={handleSumbit}>Submit</Button>
      </ModalActions>
    </Modal>
  );
};

AddReservationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddReservationModal;
