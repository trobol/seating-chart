import { Card, Feed, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import useInterval from '../Util';
import FeedEvent from './FeedEvent';

const UserLogFeed = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useInterval(() => {
    Promise.resolve(axios.get('/api/users/activity/')).then((res) => {
      const { result, error } = res.data;
      if (result) setEvents(result);
      else console.error(error);
    });
  }, 5000);

  useEffect(() => {
    if (_.isEmpty(events)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [events]);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {'User Activity Feed'}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed className="user__log__feed">
          {
            events
              ? events.map(event => (
                <FeedEvent
                  key={Math.random()}
                  image={event.image}
                  content={event.log}
                  date={event.time_logged}
                />
              ))
              : <div />
          }
          <Loader active={isLoading} inline />
        </Feed>
        <Loader />
      </Card.Content>
    </Card>
  );
};

export default UserLogFeed;
