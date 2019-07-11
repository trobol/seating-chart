import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TabTableMenuItem = ({ name, active, onClick }) => (
  <Menu.Item
    name={name}
    active={active}
    onClick={onClick}
  />
);

TabTableMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TabTableMenuItem;
