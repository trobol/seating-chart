import { Feed, Card } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedEvent from './FeedEvent';

const ActivityFeed = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      Promise.resolve(axios.get('/api/admin/logs/')).then((res) => {
        const { result, error } = res.data;
        if (result) setEvents(res.data.result.sort((a, b) => a.time_logged < b.time_logged));
        else console.error(error);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {'Recent Activity Feed'}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed className="activity__feed">
          {
            events
              ? events.map(event => (
                <FeedEvent
                  key={event.time_logged}
                  image={event.image}
                  content={event.log}
                  date={event.time_logged}
                />
              ))
              : (<div />)
          }
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default ActivityFeed;
