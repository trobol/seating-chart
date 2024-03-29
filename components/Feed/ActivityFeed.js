import { Feed, Card, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import FeedEvent from './FeedEvent';
import useInterval from '../Util';

const ActivityFeed = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useInterval(() => {
    Promise.resolve(axios.get('/api/admin/logs/')).then((res) => {
      const { result, error } = res.data;
      console.log(result);
      if (result) setEvents(res.data.result);
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
    <Card className="activity__feed__card" fluid>
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
      </Card.Content>
      <style>
        {`
          .activity__feed{
            width:100%;
          }
          .activity__feed__card{
            justify-self:center;
            wdith:90%;
          }
          .ui.fluid.card{
            width:90%;
          }
        `}
      </style>
    </Card>
  );
};

export default ActivityFeed;
