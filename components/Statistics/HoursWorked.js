import { useEffect, useState } from 'react';
import axios from 'axios';
import { Statistic } from 'semantic-ui-react';

const HoursWorked = ({ length }) => {
  const [hours, setHours] = useState(0);
  useEffect(() => {
    Promise.resolve(axios.get(`/api/admin/metrics/hours/${length}`)).then((res) => {
      console.log(res.data.hours);
      setHours(res.data.hours);
    });
  }, [length]);
  return (
    <Statistic value={hours} label={`Hours Worked in this ${length}`} />
  );
};

export default HoursWorked;
