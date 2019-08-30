import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import MapPopup from './MapPopup';


const seatPositions = [
  580.9000244140625, 710.5499877929688,
  786.2999877929688, 710.5499877929688,
  990.8800048828125, 710.5499877929688,
  1185.8499755859375, 710.5499877929688,
  1373.5899658203125, 710.5499877929688,
  502.2799987792969, 1151.239990234375,
  502.2799987792969, 1322.3399658203125,
  502.2799987792969, 1499.510009765625, 
  657.9199829101562, 1149.219970703125,
  657.0399780273438, 1320.3199462890625,
  657.9199829101562, 1497.489990234375,
  998.1400146484375, 1147.199951171875,
  997.260009765625, 1318.300048828125,
  998.1400146484375, 1495.4599609375,
  1152.989990234375, 1146.18994140625,
  1152.1099853515625, 1317.2900390625,
  1152.989990234375, 1494.449951171875,
  1565.739990234375, 1204.050048828125,
  1501.1600341796875, 1339.9100341796875,
  1501.1600341796875, 1498.25,
  1630.3199462890625,1339.9100341796875,
  1630.3199462890625, 1498.25,
  2146.2900390625, 577.3800048828125,
  2366.929931640625, 577.3800048828125,
  2587.56005859375, 577.3800048828125,
  2810.199951171875, 822.6599731445312,
  2643.719970703125, 1091.199951171875,
  2471.22998046875, 1091.199951171875,
  2291.75, 1091.199951171875,
  1675.25, 715.1799926757812,
  2125.340087890625, 1536.77001953125,
  2820.969970703125, 1536.77001953125
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
  const seatCirclesNode = useMemo(() => seatCircles.map((seatCircle, idx) => <MapPopup key={Math.random()} trigger={seatCircle} seat={seats !== null ? seats[`${idx + 1}`] : null} seatNum={idx + 1} />), [seats]);
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
