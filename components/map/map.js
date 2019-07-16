import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import Seats from './Seats';
import Def from './Def';
import BackgroundMap from './BackgroundMap';
import Title from './Title';

const SeatingMap = ({ link }) => {
  const [data, setData] = useState(null);
  const [newData, setNewData] = useState(null);
  useEffect(() => {
    if (!_.isEqual(data, newData)) {
      console.log(!_.isEqual(data, newData), { data, newData });
      setData(newData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);
  useEffect(() => {
    const interval = setInterval(() => {
      Promise.resolve(axios.get(link)).then((res) => {
        const { seats } = res.data.response;
        setNewData(seats);
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [link]);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 3000 1687" className="map">
      <Def seats={data} />
      <title>SeatingChart</title>
      <g id="solid">
        <rect className="cls-1" width="3000" height="1687" />
      </g>
      <BackgroundMap />
      <Seats seats={data} />
      <Title />
      <style>
        {`
        .map{
          height:100vh;
        }
        `}
      </style>
    </svg>
  );
};

SeatingMap.propTypes = {
  link: PropTypes.string.isRequired,
};
export default SeatingMap;
