/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, Card } from 'semantic-ui-react';
import Link from 'next/link';

const UserCardLogin = () => (
  <Card.Content className="user__login">
    <Link href="/login" prefetch>
      <Button fluid>
        <Icon name="sign in" />
        <a>Login</a>
      </Button>
    </Link>
    <style />
  </Card.Content>
);
export default UserCardLogin;
