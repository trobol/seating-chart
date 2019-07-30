import { useEffect, useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import moment from 'moment';

const weekdays = [
  { key: 1, text: 'Monday', value: 1 },
  { key: 2, text: 'Tuesday', value: 2 },
  { key: 3, text: 'Wednesday', value: 3 },
  { key: 4, text: 'Thursday', value: 4 },
  { key: 5, text: 'Friday', value: 5 },
  { key: 6, text: 'Saturday', value: 6 },
  { key: 7, text: 'Sunday', value: 7 },
];

const StartEndGroup = ({
  start: [start, setStart],
  end: [end, setEnd],
  weekday: [weekday, setWeekday],
}) => {
  const [error, setError] = useState({ isActive: false, header: 'Error', content: 'Error' });
  useEffect(() => {
    if (start === null || end === null);
    else {
      const [startDate, endDate] = [moment(start, 'k:m'), moment(end, 'k:m')];
      if (startDate >= endDate) {
        setError({ isActive: true, content: 'start time cannot occur before end time' });
      } else if (endDate.diff(startDate) < 10800000) {
        setError({ isActive: true, content: 'Reseravtions must be at least three hours long' });
      } else {
        setError({ isActive: false });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);


  return (
    <>
      <Form.Group widths="equal">
        <Form.Input label="Start Time" type="time" onChange={e => setStart(e.target.value)} required />
        <Form.Input label="End Time" type="time" onChange={e => setEnd(e.target.value)} required />
        <Form.Select fluid label="Weekday" options={weekdays} onChange={(_e, d) => setWeekday(d.value)} required />
      </Form.Group>
      { error.isActive
        ? <Message negative header={error.header} content={error.content} />
        : <div />
      }
    </>
  );
};

export default StartEndGroup;
