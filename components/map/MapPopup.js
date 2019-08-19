
import PropTypes from 'prop-types';
import {
  Popup, Image, Divider,
} from 'semantic-ui-react';
import { useEffect, useState } from 'react';

// TODO: Link up slack and email buttons
const MapPopup = ({ seat, trigger }) => (seat !== undefined && seat !== null && seat.suid !== null ? (
  <Popup trigger={trigger} hoverable closeOnPortalMouseLeave>
    <Popup.Header>{seat.computerName}</Popup.Header>
    <Popup.Content>
      <Image size="small" src={seat.path} />
      {seat.name}
      <Divider />
      {/*
        <Button icon={<Icon name="slack" size="large" />} />
        <Button icon={<Icon name="mail" size="large" />} />
        */}
    </Popup.Content>
  </Popup>
) : trigger);

MapPopup.propTypes = {
};

MapPopup.defaultProps = {
  seats: null,
};

export default MapPopup;
