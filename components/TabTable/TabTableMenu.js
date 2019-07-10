import { Menu, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TabTableMenu = ({ children }) => (
  <>
    <Menu pointing secondary>
      <img src="/static/lcdi_banner.png" />
      {children}
    </Menu>

  </>
);

TabTableMenu.propTypes = {
  children: PropTypes.node,
};
TabTableMenu.defaultProps = {
  children: <div />,
};
export default TabTableMenu;
