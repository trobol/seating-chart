import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DefStyle.css';

const Def = ({ seats }) => {
  const [patterns, setPatterns] = useState(null);
  useEffect(() => {
    if (seats !== null && seats !== undefined) {
      setPatterns(Object.keys(seats).map(key => <UserIconPattern key={`Seat${seats[key].sid}`} id={`Seat${seats[key].sid}`} path={seats[key].path} />));
    }
  }, [seats]);
  return (
    <defs>
      {(seats !== null && seats !== undefined)
        ? patterns
        : null}
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
    sid: PropTypes.number,
    uid: PropTypes.number,
    name: PropTypes.string,
    path: PropTypes.string,
  })),
};

Def.defaultProps = {
  seats: [],
};

UserIconPattern.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Def;
