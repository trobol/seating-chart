import {
  Button, Header, Modal, Form, Message,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import UserSearch from '../Form/AddReservationsForm/UserSearch';
import StartEndGroup from '../Form/AddReservationsForm/StartEndGroup';
import useInterval from '../Util';

// https://react.semantic-ui.com/modules/search/#types-standard

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
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState({ isActive: false, header: 'Error', content: 'No Error' });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    Promise.resolve(axios.get('/api/users/get-user/'))
      .then((res) => {
        console.log(res.data.user);
        if (res.data.user) {
          setUser(res.data.user);
          if (res.data.user.userTypes && res.data.user.userTypes.includes('Admin')) {
            setIsAdmin(true);
          }
        }
      });
  }, []);

  useInterval(() => {
    Promise.resolve(axios.get('/api/users/reservations/')).then((res) => {
      const { results } = res.data;
      if (!_.isEqual(reservations, results)) setReservations(results);
    });
  }, 1000);

  // Validates that the current reservation does not overlap with any other reservations
  useEffect(() => {
    if (!start || !end || !seat || !weekday || !expires);
    else {
      const overlaps = reservations
        .filter(r => r.seat === Number(seat) && r.weekday === Number(weekday) && moment(r.expires) > moment())
        .flatMap((r) => {
          const [nStart, nEnd, rStart, rEnd] = [moment(start, 'k:m'), moment(end, 'k:m'), moment(r.start, 'k:m'), moment(r.end, 'k:m')];
          if ((nStart < rStart && nEnd < rStart) || (nStart > rEnd && nEnd > rEnd)) {
            return true;
          }
          return false;
        })
        .includes(false);
      if (overlaps) {
        setError({ isActive: true, content: 'This reservation overlaps with another' });
      } else {
        setError({ isActive: false });
      }
    }
  }, [end, expires, reservations, seat, start, user.id, weekday]);

  // TODO: Validate that the user doesn't have any other reservations at the same time.
  useEffect(() => {

  });

  // TODO: Data Validation
  const handleSumbit = () => {
    console.log('submitting data');
    const url = isAdmin ? '/api/admin/reservations' : '/api/users/reservations';
    const uid = isAdmin ? user.idusers : user.id;
    const postData = {
      uid, sid: seat, start, end, weekday, expires, reason,
    };
    // Unable to post using the post body with axios others were having the same issues
    // I used params and the api reflects those changes
    Promise.resolve(axios({ method: 'post', url, params: postData }))
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setOpen(false);
  };

  return (
    <>
      <Header>Add Reservation</Header>
      <Modal.Description>
        <Form>
          <Form.Select fluid label="Seat" placeholder="Seat" options={seats} onChange={e => setSeat(e.target.innerText)} required />
          <Form.Group widths="equal">
            {isAdmin
              ? (
                <>
                  <Form.Field>
                    <UserSearch value={[value, setValue]} searchResults={[searchResults, setSearchResults]} user={[user, setUser]} />
                  </Form.Field>
                  <Form.Field>
                    <input readOnly value={user.title} required />
                  </Form.Field>
                </>
              )
              : (
                <Form.Field>
                  <input readOnly value={user.name} required />
                </Form.Field>
              )}
          </Form.Group>
          <StartEndGroup
            start={[start, setStart]}
            end={[end, setEnd]}
            weekday={[weekday, setWeekday]}
            uid={user.id}
            seat={seat}
            isError={isError => (isError ? setError({ isActive: isError }) : null)}
          />
          <Form.Group label="Expiration" widths="equal">
            <Form.Input label="Expiration Date" type="date" required onChange={({ target }) => setExpires(target.valueAsDate)} />
          </Form.Group>
          { error.isActive && error.content
            ? <Message negative header={error.header} content={error.content} />
            : <div />
          }
          <Form.TextArea label="Reason" required onChange={e => setReason(e.target.value)} />
        </Form>
      </Modal.Description>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit" color="green" onClick={handleSumbit} disabled={error.isActive}>Submit</Button>
      </Modal.Actions>
    </>
  );
};

AddReservationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddReservationModal;
