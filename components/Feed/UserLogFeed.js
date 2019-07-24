import { Card, Feed, Loader } from 'semantic-ui-react';

const UserLogFeed = () => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        {'User Activity Feed'}
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed className="user__log__feed" />
      <Loader />
    </Card.Content>
  </Card>
);

export default UserLogFeed;
