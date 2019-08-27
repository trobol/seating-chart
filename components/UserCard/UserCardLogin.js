/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, Card } from 'semantic-ui-react';
import Link from 'next/link';
import React, { useState } from "react";


const UserCardLogin = () => {

  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`)
  };
  return (
  
  <Card.Content className="user__login">
    <Link href="/login" prefetch>
      <Button fluid>
        <Icon name="sign in" />
        <a>Login</a>
      </Button>
    </Link>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Enter Username" />
      <input type="password" name="password" placeholder="Enter Password" />
      <input type="submit" value="Submit" />
    </form>
    <style />
  </Card.Content>
);};
export default UserCardLogin;
