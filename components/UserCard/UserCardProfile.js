import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const UserCardProfile = ({ image, name, info }) => (
  <Card.Content>
    <Image src={image} floated="left" size="mini" circular />
    <Card.Header>{name}</Card.Header>
    <Card.Meta>{info}</Card.Meta>
  </Card.Content>
);

UserCardProfile.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default UserCardProfile;
