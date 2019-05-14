import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DefStyle.css';

const Def = ({ seats }) => {
  const [patterns, setPatterns] = useState(null);
  useEffect(() => {
    if (seats !== null && seats !== undefined) {
      setPatterns(seats.map(seat => <UserIconPattern key={`Seat${seat.idseats}`} id={`Seat${seat.idseats}`} path={seat.image} />));
    }
  }, [seats]);
  return (
    <defs>
      {patterns}
    </defs>
  );
};

const UserIconPattern = ({ id, path }) => (
  <pattern id={id} x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
    <image x="0%" y="0%" width="512" height="512" xlinkHref={path} />
  </pattern>
);

Def.propTypes = {
  seats: PropTypes.arrayOf(PropTypes.shape({
    idseats: PropTypes.number.isRequired,
    u_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
};

UserIconPattern.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Def;
