import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { useEffect } from 'react';

const UserCardAction = ({ title, icon, handleClick }) => {
  useEffect(() => {}, []);
  return (
    <List.Item key={title} onClick={handleClick}>
      <List.Icon name={icon} />
      <List.Content>
        {title}
      </List.Content>
    </List.Item>
  );
};

UserCardAction.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default UserCardAction;
