/*import {
  Header, ModalDescription, Form, FormField, FormInput, FormSelect, Search,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';

// https://react.semantic-ui.com/modules/search/#types-standard

const source = _.times(5, () => ({
  name: 'Kevin',
}));

const AddReservationModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const resetState = () => {
    setIsLoading(false);
    setValue('');
    setResults([]);
  };
  const handleResultSelect = (e, obj) => setValue(obj.result.name);
  const handleSearchChange = (e, obj) => {
    Promise.all([setIsLoading(true), setValue(obj.value)]).then(() => {
      console.log(value, isLoading);
      setTimeout(() => {
        if (value.length < 1) return resetState();
        const re = new RegExp(_.escapeRegExp(obj.value), 'i');
        const isMatch = r => re.test(r.name);
        setIsLoading(false);
        setResults(_.filter(data, isMatch));
      }, 300);
    });
  };
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/users/')).then((res) => {
      const resData = res.data.response.results;
      setData(resData.map(row => ({ title: row.name, description: row.pronoun, image: `static/users/${row.image}` })));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header>Add Reservation</Header>
      <ModalDescription>
        <Form>
          <FormSelect fluid type="number" label="seat" placeholder="Seat" options={Array.from(Array(32), (x, index) => `${index + 1}`)} />
          <Search
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
          />
        </Form>
      </ModalDescription>
    </>
  );
};*/

import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

export default class AddReservationModal extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
        <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        {...this.props}
      />
    )
  }
}


// export default AddReservationModal;
