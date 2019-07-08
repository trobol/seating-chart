import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Seats from './Seats';
import Def from './Def';
import BackgroundMap from './BackgroundMap';
import Title from './Title';

const Map = ({ link }) => {
  const [url] = useState(link);
  const [data, setData] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      Promise.resolve(axios.get(url)
        .then((res) => {
          const { seats } = res.data.response;
          if (seats !== null && seats !== undefined) {
            setData(seats);
          }
        }));
    }, 1500);
    return () => clearInterval(interval);
  }, [data, url]);
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
          width:100%;
        }
        `}
      </style>
    </svg>
  );
};

Map.propTypes = {
  link: PropTypes.string.isRequired,
};
export default Map;
