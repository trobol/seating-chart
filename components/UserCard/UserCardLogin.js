import { Button, Icon, Card } from 'semantic-ui-react';
import Link from 'next/link';

const UserCardLogin = () => (
  <Card.Content className="user__login">
    <Button.Group widths="2">
      <Button>
        <Icon name="sign in" />
        <Link href="/login"><a>Login</a></Link>
      </Button>
      <Button>
        <Icon name="add circle" />
        <Link href="/register"><a>Register</a></Link>
      </Button>
    </Button.Group>
    <style />
  </Card.Content>
);
export default UserCardLogin;
