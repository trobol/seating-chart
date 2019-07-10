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
        if (result) setEvents(res.data.result);
        else console.error(error);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="card__stats">
      <Card.Content>
        <Card.Header>
          {'Recent Activity Feed'}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed className="activity__feed">
          {
            events
              ? events.reverse().map(event => (
                <FeedEvent
                  key={Math.random()}
                  image={event.image}
                  content={event.log}
                  date={event.time_logged}
                />
              ))
              : (<div />)
          }
        </Feed>
      </Card.Content>
      <style>
        {`
          .activity__feed{
            width:100%;
          }
          .card_stats{
            wdith:100%;
          }
        `}
      </style>
    </Card>
  );
};

export default ActivityFeed;
