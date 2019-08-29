/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, Card, Form } from 'semantic-ui-react';
import Link from 'next/link';
import React, { useState } from "react";
import useForm from '../Form/useForm'
import './UserCardLogin.css';
import axios from 'axios';
import RemoteAction from '../RemoteAction';

const UserCardLogin = ({ callback }) => {

  const { values, handleChange } = useForm(login);
  const { message, setMessage } = useState('');

  const [active, setActive] = useState(false);
  function open(e) {
    if (!active) {
      e.preventDefault();
      setActive(true)
      return false;
    } else {
      return true;
    }
  }
  function login(response) {

    if (response.status === 200) {
      console.log(response.data);
      callback(response.data.user);
    }

  }

  function fail(response) {
    setMessage(response.data);
  }

  return (

    <Card.Content className={`${active ? 'active' : ''} user__login`} >

      <Form>
        <div className="user_login_form">
          <Form.Input className="user_login_input" type="text" label="Username" name="username" onChange={handleChange} value={values.email} required />
          <Form.Input className="user_login_input" type="password" label="Password" name="password" onChange={handleChange} value={values.password} required />
          <Form.Label>{message}</Form.Label>
        </div>
        <RemoteAction pre={open} url="/api/login" title="Login" icon="sign in" fail={fail} callback={login} data={values} />

      </Form>

    </Card.Content >
  );
};
export default UserCardLogin;
