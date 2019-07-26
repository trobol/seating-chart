import { useState } from 'react';
import axios from 'axios';
import { Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import useInterval from '../Util';

const HoursWorked = ({ length }) => {
  const [hours, setHours] = useState(0);
  useInterval(() => {
    Promise.resolve(axios.get(`/api/admin/metrics/hours/${length}`)).then((res) => {
      setHours(res.data.hours);
    });
  }, 1500);
  return (
    <Statistic value={hours.toFixed(2)} label={`Hours Worked in this ${length}`} />
  );
};

HoursWorked.propTypes = {
  length: PropTypes.string.isRequired,
};

export default HoursWorked;
