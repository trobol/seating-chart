/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, Card, Form } from 'semantic-ui-react';
import Link from 'next/link';
import React, { useState } from "react";
import './UserCardLogin.css';
import axios from 'axios';
import RemoteAction from '../RemoteAction';

const UserCardLogin = ({ callback }) => {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);

  //0 = none, 1 = username, 2 = password
  const [invaid, setInvalid] = useState(0);
  const [active, setActive] = useState(false);
  function open(e) {
    if (!active) {
      e.preventDefault();
      setActive(true)
      return false;
    } else {
      if (username === '') {
        setInvalid(1);
        return false;
      }

      if (password === '') {
        setInvalid(2);
        return false;
      }
      return true;
    }
  }
  function login(response) {
    if (response.status === 200) {
      console.log(response.data);
      callback(response.data.user);
    }
  }

  function updateUsername(e, data) {
    if (invaid === 1) setInvalid(0);
    setUsername(data.value);
  }

  function updatePassword(e, data) {
    if (invaid === 2) setInvalid(0);
    setPassword(data.value);
  }

  function fail(err) {
    if (err.response.status === 401) {
      if (err.response.data.username) {
        setInvalid(1);
      }
      if (err.response.data.password) {
        setInvalid(2);
      }
    }
  }

  return (
    <Card.Content className={`${active ? 'active' : ''} user__login`} >

      <Form>
        <div className="user_login_form">
          <Form.Input error={invaid === 1} autoComplete="password" className="user_login_input" type="text" label="Username" name="username" onChange={updateUsername} value={username} />
          <Form.Input error={invaid === 2} autoComplete="current-password" className="user_login_input" type="password" label="Password" name="password" onChange={updatePassword} value={password} />
          <Form.Checkbox label={<label name="remember">Remember Me</label>} name="remember" onChange={(e, data) => setRemember(data.checked)} value={remember} />
        </div>
        <RemoteAction pre={open} url="/api/login" title="Login" method="post" icon="sign in" fail={fail} callback={login} data={{ username, password, remember }} />

      </Form>

    </Card.Content >
  );
};
export default UserCardLogin;
