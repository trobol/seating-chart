import {
  Card, Progress, Statistic, Loader,
} from 'semantic-ui-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import useInterval from '../Util';
import moment from 'moment';
import useInterval from '../Util';

const ReservationProgess = () => {
  const [percent, setPercent] = useState(0.0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [hasReservation, setHasReservation] = useState(null);
  useEffect(() => {
    Promise.resolve(axios.get('/api/users/reservations/today'))
      .then((res) => {
        console.log({ res });
        const { start, end } = res.data.result[0];
        if (start && end) {
          setStartTime(moment(start, 'k:m:s'));
          setEndTime(moment(end, 'k:m:s'));
          setHasReservation(true);
        } else {
          setHasReservation(false);
        }
      }).catch(error => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useInterval(() => {
    if (startTime && endTime) {
      const totalTime = moment(endTime).diff(startTime);
      const currentTime = moment(moment()).diff(startTime);
      const newPercent = currentTime / totalTime * 100;
      if (newPercent > 100) {
        setHasReservation(false);
      } else {
        setPercent(newPercent);
        setRemaining(moment.duration(moment(endTime).diff(moment())));
      }
    }
  }, 1000);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {hasReservation ? 'Your Current Reservation' : 'No Reservations'}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {hasReservation ? (
          <>
            <Statistic.Group size="small">
              { remaining
                ? (
                  <Statistic
                    label="Remaining"
                    value={`${remaining.hours()}:${remaining.minutes() < 10
                      ? `0${remaining.minutes()}`
                      : remaining.minutes()}:${remaining.seconds() < 10
                      ? `0${remaining.seconds()}`
                      : remaining.seconds()}`}
                    style={{ textAlign: 'center' }}
                  />
                )
                : <Loader active />
              }
              <Statistic label="Time" value={moment().format('hh:mma')} />
            </Statistic.Group>
            <Progress indicating percent={percent} />
            <Statistic.Group size="small">
              <Statistic label="Start" value={startTime.format('hh:mma')} />
              <Statistic label="End" value={endTime.format('hh:mma')} />
            </Statistic.Group>
          </>
        )
          : <div />
        }
      </Card.Content>
    </Card>
  );
};

export default ReservationProgess;
