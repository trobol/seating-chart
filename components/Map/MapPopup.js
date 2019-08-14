
import PropTypes from 'prop-types';
import {
  Popup, Image, Icon, Button, Divider,
} from 'semantic-ui-react';
import { useEffect, useState } from 'react';

// TODO: Link up slack and email buttons
const MapPopup = ({ seats, seatNum, trigger }) => {
  const [seat, setSeat] = useState(null);
  useEffect(() => {
    const newSeat = seats ? seats.filter(el => el.sid === seatNum)[0] : null;
    if (newSeat !== seat) {
      setSeat(newSeat);
    } else if (newSeat === undefined) {
      setSeat(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seats]);
  return (seat ? (
    <Popup trigger={trigger} hoverable>
      <Popup.Header>{seat.computerName}</Popup.Header>
      <Popup.Content>
        <Image size="small" src={seat.image} />
        {seat.name}
        <Divider />
        {/*
        <Button icon={<Icon name="slack" size="large" />} />
        <Button icon={<Icon name="mail" size="large" />} />
        */}
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
