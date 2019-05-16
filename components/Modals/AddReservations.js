import {
  Header, ModalDescription, Form, FormField, FormInput, FormSelect, Search, FormGroup,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';

// https://react.semantic-ui.com/modules/search/#types-standard

const AddReservationModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState({});
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const seats = Array.from(Array(32), (x, index) => ({ key: (index + 1), text: `${index + 1}`, value: index + 1 }));
  console.log(seats);
  const resetState = () => {
    setIsLoading(false);
    setValue('');
    setResults([]);
  };
  const handleResultSelect = (e, obj) => { setStudent((data.filter(s => s.id === obj.result.id))[0]); resetState(); };
  const handleSearchChange = (e, obj) => {
    setValue(obj.value);
    if (obj.value.length < 1) return resetState();
    const re = new RegExp(_.escapeRegExp(obj.value), 'i');
    const isMatch = r => re.test(r.title);
    // console.log({ re, isMatch }, _.filter(data, isMatch));
    setResults(_.filter(data, isMatch));
  };
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const resData = res.data.response.results;
      setData(resData.map(row => ({
        id: row.idusers,
        title: row.name,
        description: row.pronoun,
        image: `/static/users/${row.image}.jpg`,
      })));
    });
  }, []);
  return (
    <>
      <Header>Add Reservation</Header>
      <ModalDescription>
        <Form>
          <FormSelect fluid label="Seat" placeholder="Seat" options={seats} />
          <FormGroup widths="equal">
            <FormField>
              <Search
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
              />
            </FormField>
            <FormField>
              <input readOnly value={student.title} />
              <input hidden value={student.id} />
            </FormField>
          </FormGroup>
          <FormGroup widths="equal">
            <FormInput label="Start Time" type="time" />
            <FormInput label="End Time" type="time" />
          </FormGroup>
          <FormGroup label="Expiration" widths="equal">
            <FormInput label="Date" type="date" />
            <FormInput label="Time" type="time" />
          </FormGroup>
        </Form>
      </ModalDescription>
    </>
  );
};

export default AddReservationModal;
