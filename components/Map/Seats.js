import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import MapPopup from './MapPopup';
import SeatNode from './Seat';
import Axios from 'axios';


function Seat(x, y, name) {
  this.x = x;
  this.y = y;
  this.name = name;
}
const seatPositions = [
  new Seat(2278, 860, 'Reseach-01'),
  new Seat(2081, 860, 'Reseach-02'),
  new Seat(1884, 860, 'Reseach-03'),
  new Seat(1687, 860, 'Reseach-04'),
  new Seat(1490, 860, 'Reseach-05'),
  new Seat(2345, 420, 'Reseach-06'),
  new Seat(2345, 240, 'Reseach-07'),
  new Seat(2345, 60, 'Reseach-08'),
  new Seat(2215, 420, 'Reseach-09'),
  new Seat(2215, 240, 'Reseach-10'),
  new Seat(2215, 60, 'Reseach-11'),
  new Seat(1850, 420, 'Reseach-12'),
  new Seat(1850, 240, 'Reseach-13'),
  new Seat(1850, 60, 'Reseach-14'),
  new Seat(1720, 420, 'Reseach-15'),
  new Seat(1720, 240, 'Reseach-16'),
  new Seat(1720, 60, 'Reseach-17'),
  new Seat(1295, 365, 'Reseach-18'),
  new Seat(1360, 240, 'Reseach-19'),
  new Seat(1360, 60, 'Reseach-20'),
  new Seat(1230, 240, 'Reseach-21'),
  new Seat(1230, 60, 'Reseach-22'),
  new Seat(700, 1000, 'Reseach-23'),
  new Seat(450, 1000, 'Reseach-24'),
  new Seat(200, 1000, 'Reseach-25'),
  new Seat(50, 750, 'Reseach-26'),
  new Seat(200, 475, 'Reseach-27'),
  new Seat(375, 475, 'Reseach-28'),
  new Seat(550, 475, 'Reseach-29'),
  new Seat(1185, 860, 'Reseach-30'),
  new Seat(735, 30, 'Reseach-31'),
  new Seat(35, 30, 'Reseach-32')
];

const Seats = ({ seats }) => {


  const [selectedSeat, selectSeat] = useState(-1);

  const seatCirclesNode = seatPositions.map((seat, index) => {
    return <SeatNode key={index} index={index} name={seat.name} x={seat.x} y={seat.y} active={false} selectSeat={selectSeat} selectedSeat={selectedSeat} />;
  });

  function updateSeats() {
    Axios.get('/seats')
      .then((res) => {
        if (res.status !== 200) return;
        const { users } = req.body;
        if (users) {
          for (let i = 0; i < users.length; i++) {
            if (users[i]) {
              seatCirclesNode[i].props.user = users[i];
            }
          }
        }
      });
  }

  updateSeats();

  useEffect(() => {

  }, [seats]);
  return (
    <>
      {seatCirclesNode}

    </>
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
