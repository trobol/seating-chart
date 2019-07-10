import { Card, Feed } from 'semantic-ui-react';

const UserLogFeed = () => (
  <Card>
    <Card.Content>
      <Card.Header>
        {'Users Clock-in Activity'}
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed className="user__log__feed" />
    </Card.Content>
  </Card>
);

export default UserLogFeed;
