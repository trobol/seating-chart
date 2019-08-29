/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, Card, Form } from 'semantic-ui-react';
import Link from 'next/link';
import React, { useState } from "react";
import useForm from '../Form/useForm'
import './UserCardLogin.css';

const UserCardLogin = () => {

  const { values, handleChange, handleSubmit } = useForm(login);

  const [active, setActive] = useState(false);
  function login() {
    if (active) {
      console.log(values);
      fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(values),
      });
    } else {
      setActive(true);
    }
  }
  function toggleClass() {

  }
  return (

    <Card.Content className={`${active ? 'active' : ''} user__login`} >

      <Form>
        <div className="user_login_form">
          <Form.Input className="user_login_input" type="text" label="Username" name="username" onChange={handleChange} value={values.email} required />
          <Form.Input className="user_login_input" type="password" label="Password" name="password" onChange={handleChange} value={values.password} required />

        </div>
        <Button onClick={() => login()} fluid>
          <Icon name="sign in" />
          <a>Login</a>
        </Button>
      </Form>

    </Card.Content >
  );
};
export default UserCardLogin;
