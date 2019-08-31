import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import Seats from './Seats';
import Def from './Def';
import BackgroundMap from './BackgroundMap';
import Title from './Title';
import useInterval from '../Util';

const SeatingMap = ({ link }) => {
  const [data, setData] = useState(null);
  useInterval(() => {
    Promise.resolve(axios.get(link)).then((res) => {
      try {
        const { seats } = res.data;
        if (!_.isEqual(data, seats)) {
          console.log({ seats });
          setData(seats);
        }
      } catch (error) {
        console.error({ error });
      }
    });
  }, 1500);
  const imgWidth = 2790, imgHeight = 1145;
  return (
    <>
      <div className="map-container">
        <div className="map-inner">
          <img src="/static/layout.svg"></img>
        </div>
      </div>
      <style>
        {`
        .map-container {
          position:absolute;
          left:0;
          bottom:10px;
          width:100vw;
          max-width:calc(100vh * ${imgWidth}/${imgHeight});
          height:100vh;
          max-height:calc(100vw * ${imgHeight}/${imgWidth});
        }
        .map-inner {
           width:100%;
           height:100%;
        }
      `}
      </style>
    </>
  );
};

SeatingMap.propTypes = {
  link: PropTypes.string.isRequired,
};
export default SeatingMap;
