import { Card, Feed, Loader } from 'semantic-ui-react';

const OnlineUsersFeed = () => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        {'Current Online Users'}
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed className="online__users__feed" />
      <Loader />
    </Card.Content>
  </Card>

);

export default OnlineUsersFeed;
