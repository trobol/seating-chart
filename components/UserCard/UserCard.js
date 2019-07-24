import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const UserCard = ({ children }) => (
  <Card className="user__card">
    {children}
    <style>
      {`
      .user__card{
        position: absolute !important;
        left:65%;
        top:3%;
      }
      div .item:hover{
        background-color: grey;
      }
    `}
    </style>
  </Card>
);

UserCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

UserCard.defaultProps = {
  children: <div />,
};

export default UserCard;
