
import PropTypes from 'prop-types';
import { Popup, Card } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

const MapPopup = ({ seats, seatNum, trigger }) => {
  const [seat, setSeat] = useState(null);
  useEffect(() => setSeat(seats ? seats.filter(el => el.sid === seatNum)[0] : null), [seatNum, seats]);
  return (seat ? (
    <Popup trigger={trigger}>
      <Popup.Content>
        <Card image={seat.image} header={seat.name} meta={seat.computerName} />
      </Popup.Content>
    </Popup>
  ) : trigger);
};

MapPopup.propTypes = {
  seats: PropTypes.arrayOf(PropTypes.shape({
    sid: PropTypes.number,
    uid: PropTypes.number,
    name: PropTypes.string,
    path: PropTypes.string,
  })),
  seatNum: PropTypes.number.isRequired,
};

MapPopup.defaultProps = {
  seats: null,
};

export default MapPopup;
