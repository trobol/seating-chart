import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const UserCardProfile = ({
  image, name, info, clockedIn,
}) => (
  <Card.Content>
    <Image src={image} floated="left" size="mini" circular className="user__card__image" />
    <Card.Header>{name}</Card.Header>
    <Card.Meta>{info}</Card.Meta>
    <style>
      {`
      .user__card__image{
        ${clockedIn
        ? 'box-shadow: 0 0 5px rgb(0,255,51), 0 0 5px rgb(0,255,51);'
        : 'box-shadow: 0 0 5px rgb(255,51,0), 0 0 5px rgb(255,51,0);'
        }
      }
      `}
    </style>
  </Card.Content>
);

UserCardProfile.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default UserCardProfile;
