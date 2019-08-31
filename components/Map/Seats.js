import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import MapPopup from './MapPopup';


function Seat(x, y, name) {
  this.x = x;
  this.y = y;
  this.name = name;
}
const seatPositions = [
  new Seat(0, 0, 'Reseach-01')
];

const seatCircles = [
  <circle id="Seat1" className="cls-12" cx="580.9" cy="710.55" r="43.32" />,
  <circle id="Seat2" className="cls-12" cx="786.3" cy="710.55" r="43.32" />,
  <circle id="Seat3" className="cls-12" cx="990.88" cy="710.55" r="43.32" />,
  <circle id="Seat4" className="cls-12" cx="1185.85" cy="710.55" r="43.32" />,
  <circle id="Seat5" className="cls-12" cx="1373.59" cy="710.55" r="43.32" />,
  <circle id="Seat6" className="cls-12" cx="502.28" cy="1151.24" r="43.32" />,
  <circle id="Seat7" className="cls-12" cx="502.28" cy="1322.34" r="43.32" />,
  <circle id="Seat8" className="cls-12" cx="502.28" cy="1499.51" r="43.32" />,
  <circle id="Seat9" className="cls-12" cx="657.92" cy="1149.22" r="43.32" />,
  <circle id="Seat10" className="cls-12" cx="657.04" cy="1320.32" r="43.32" />,
  <circle id="Seat11" className="cls-12" cx="657.92" cy="1497.49" r="43.32" />,
  <circle id="Seat12" className="cls-12" cx="998.14" cy="1147.2" r="43.32" />,
  <circle id="Seat13" className="cls-12" cx="997.26" cy="1318.3" r="43.32" />,
  <circle id="Seat14" className="cls-12" cx="998.14" cy="1495.46" r="43.32" />,
  <circle id="Seat15" className="cls-12" cx="1152.99" cy="1146.19" r="43.32" />,
  <circle id="Seat16" className="cls-12" cx="1152.11" cy="1317.29" r="43.32" />,
  <circle id="Seat17" className="cls-12" cx="1152.99" cy="1494.45" r="43.32" />,
  <circle id="Seat18" className="cls-12" cx="1565.74" cy="1204.05" r="43.32" />,
  <circle id="Seat19" className="cls-12" cx="1501.16" cy="1339.91" r="43.32" />,
  <circle id="Seat20" className="cls-12" cx="1501.16" cy="1498.25" r="43.32" />,
  <circle id="Seat21" className="cls-12" cx="1630.32" cy="1339.91" r="43.32" />,
  <circle id="Seat22" className="cls-12" cx="1630.32" cy="1498.25" r="43.32" />,
  <circle id="Seat23" className="cls-12" cx="2146.29" cy="577.38" r="43.32" />,
  <circle id="Seat24" className="cls-12" cx="2366.93" cy="577.38" r="43.32" />,
  <circle id="Seat25" className="cls-12" cx="2587.56" cy="577.38" r="43.32" />,
  <circle id="Seat26" className="cls-12" cx="2810.2" cy="822.66" r="43.32" />,
  <circle id="Seat27" className="cls-12" cx="2643.72" cy="1091.2" r="43.32" />,
  <circle id="Seat28" className="cls-12" cx="2471.23" cy="1091.2" r="43.32" />,
  <circle id="Seat29" className="cls-12" cx="2291.75" cy="1091.2" r="43.32" />,
  <circle id="Seat30" className="cls-12" cx="1675.25" cy="715.18" r="43.32" />,
  <circle id="Seat31" className="cls-12" cx="2125.34" cy="1536.77" r="43.32" />,
  <circle id="Seat32" className="cls-12" cx="2820.97" cy="1536.77" r="43.32" />,
];

const Seats = ({ seats }) => {
  const [styledSeats, setStyledSeats] = useState(null);
  const seatCirclesNode = useMemo(() => {


    seatCircles.map((seatCircle, idx) => <MapPopup key={idx} trigger={seatCircle} seat={seats !== null ? seats[`${idx + 1}`] : null} seatNum={idx + 1} />)
  }, [seats]);
  useEffect(() => {
    if (seats !== null && seats !== undefined) {
      console.log({ seats });
      setStyledSeats(Object.keys(seats).flatMap((key) => {
        const now = moment();
        if (seats[key].suid !== null) return `#Seat${seats[key].sid}{fill:url(#Seat${seats[key].sid})}`;
        if (!_.isEmpty(seats[key].reservation) && seats[key].reservation.filter(({
          expires, start, end, weekday,
        }) => weekday === now.weekday() && moment(expires, 'YYYY-MM-DD HH:mm:ss') > now && moment(end, 'HH:mm:ss') > now && moment(start, 'HH:mm:ss') < now).length) return `#Seat${seats[key].sid}{fill:red}`;
        return '';
      }));
    }
  }, [seats]);
  return (
    <g id="Seats">
      {seatCirclesNode}
      <style>
        {styledSeats}
      </style>
    </g>
  );
};

/* Seats.propTypes = {
  seats: PropTypes.arrayOf(PropTypes.shape({
    sid: PropTypes.number,
    uid: PropTypes.number,
    computerName: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
  })),
}; */

Seats.defaultProps = {
  seats: null,
};

export default Seats;
