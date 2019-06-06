import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const UserCardModalItem = ({
  children, setOpen, title, icon,
}) => (
  <List.Item key={title} onClick={() => setOpen(true)}>
    <List.Icon name={icon} />
    <List.Content>
      {title}
    </List.Content>
    {children}
  </List.Item>
);

UserCardModalItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
UserCardModalItem.defaultProps = {
  children: <div />,
};
export default UserCardModalItem;
