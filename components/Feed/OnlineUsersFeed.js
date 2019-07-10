import { Card, Feed } from 'semantic-ui-react';

const OnlineUsersFeed = () => (
  <Card>
    <Card.Content>
      <Card.Header>
        {'Current Online Users'}
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed className="online__users__feed" />
    </Card.Content>
  </Card>

);

export default OnlineUsersFeed;
