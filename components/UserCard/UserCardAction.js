import PropTypes from 'prop-types';
import { List, Loader } from 'semantic-ui-react';
import { useState } from 'react';

const UserCardAction = ({ title, icon, handleClick }) => {
  const [loading, setLoading] = useState(false);
  return (
    <List.Item key={title} onClick={handleClick}>
      {loading
        ? <Loader />
        : (
          <>
            <List.Icon name={icon} />
            <List.Content>
              {title}
            </List.Content>
          </>
        )
      }

    </List.Item>
  );
};

UserCardAction.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default UserCardAction;
