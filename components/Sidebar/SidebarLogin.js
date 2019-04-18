import PropTypes from 'prop-types';

import SidebarItem from './SidebarItem';

const SidebarLogin = ({ icon }) => (
  <ul className="Sidebar__login">
    <SidebarItem link="/login" title="Login" icon={icon} prefetch />

    <style jsx>
      {`
        .Sidebar__login {
          display: flex;
          position: absolute;
          padding: 0;

          bottom: 12px;
          list-style: none;
        }
      `}
    </style>
  </ul>
);

SidebarLogin.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
};

export default SidebarLogin;
