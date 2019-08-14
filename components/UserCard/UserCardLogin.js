/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, Card } from 'semantic-ui-react';
import Link from 'next/link';

const UserCardLogin = () => (
  <Card.Content className="user__login">
    <Button fluid>
      <Icon name="sign in" />
      <Link href="/login" prefetch><a href="/login">Login</a></Link>
    </Button>
    <style />
  </Card.Content>
);
export default UserCardLogin;
