import { useState, useEffect } from 'react';
import {
  Modal, Form, Checkbox, Button,
} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import useInterval from '../Util';

const ForceReturnModal = ({ open, setOpen }) => {
  const [returnAll, setReturnAll] = useState(false);
  const [seats, setSeats] = useState([]);
  const [seat, setSeat] = useState([]);

  const handleSumbit = () => {
    console.log(seat);
    if (returnAll) {
      Promise.resolve(axios.post('api/seat/force-all/')).then((res) => {
        console.log(res);
      });
    } else {
      Promise.resolve(axios.post('api/seat/force/', { seat })).then((res) => {
        console.log(res);
      });
    }
    setOpen(false);
  };

  useInterval(() => {
    Promise.resolve(axios.get('/api/seat/'))
      .then((res) => {
        const { data } = res;
        const newSeats = data.seats
          .filter(({ uid }) => uid !== null)
          .map(({ sid, computerName }) => ({ key: sid, text: computerName, value: sid }));
        if (!_.isNull(data) && !_.isEqual(seats, newSeats)) {
          setSeats(newSeats);
        }
      });
  }, 1000);

  return (
    <>
      <Modal.Header>Force Return</Modal.Header>
      <Modal.Description>
        <Form>
          <Form.Select
            placeholder="Seat"
            options={seats}
            disabled={returnAll}
            onChange={(_e, d) => setSeat(d.value)}
          >
          </Form.Select>
          <Form.Field control={Checkbox} label="Force Return All" onChange={(_e, d) => setReturnAll(d.checked)} />
        </Form>
      </Modal.Description>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>No</Button>
        <Button color="green" onClick={handleSumbit}>Yes</Button>
      </Modal.Actions>
    </>
  );
};

export default ForceReturnModal;
