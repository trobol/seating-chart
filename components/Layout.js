import PropTypes from 'prop-types';
import {
  faSignInAlt, faSignOutAlt, faSync, faCalendarAlt, faPlusCircle, faUserEdit, faLock,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  Sidebar, SidebarLogo, SidebarSection, SidebarItem,
} from './Sidebar';
import { SystemFonts } from './Constants';


const Layout = ({ children }) => (
  <div className="Layout">
    <Sidebar>
      <SidebarLogo image="/static/lcdi_banner.png" alt="LCDI Banner" />
      <SidebarSection title="Seat Options">
        <SidebarItem link="/api/seat/take" icon={faSignInAlt} title="Take Seat" />
        <SidebarItem link="/api/seat/return" icon={faSignOutAlt} title="Return Seat" />
        <SidebarItem link="/api/seat/change" icon={faSync} title="Change Seat" />
        <SidebarItem link="/api/seat/reserve" icon={faCalendarAlt} title="Reserve Seat" />
      </SidebarSection>
      <SidebarSection title="User Options">
        <SidebarItem link="/api/user/register" icon={faPlusCircle} title="Register User" />
        <SidebarItem link="/api/user/edit" icon={faUserEdit} title="Manage User" />
        <SidebarItem link="/api/user/timesheet" icon={faClock} title="View Timesheet" />
        <SidebarItem link="/admin" icon={faLock} title="Admin Panel" preFetch />
      </SidebarSection>
    </Sidebar>
    <div className="Content">
      {children}
    </div>

    <style jsx>
      {` 
        .Layout {
          display: flex;
          flex-direction: row;
        }

        .Content {
          display: flex;
          flex-direction: column;
          width: calc(100vw - 200px);
          height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
        }
    `}
    </style>
    <style jsx global>
      {`
        body {
          margin: 0;
          font-family: ${SystemFonts};
        }
    `}
    </style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: <div />,
};

export default Layout;
