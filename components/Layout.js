import PropTypes from 'prop-types';
import {
  faSignInAlt, faSignOutAlt, faSync,
  faCalendarAlt, faPlusCircle, faUserEdit, faLock,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import {
  Sidebar, SidebarLogo, SidebarSection, SidebarItem, SidebarModalItem,
} from './Sidebar';
import { SystemFonts } from './Constants';
import { Modal } from './Modals';

config.autoAddCss = false;

const Layout = ({ children }) => (
  <div className="Layout">
    <Head>
      <title>LCDI - Seating Chart</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
    <Sidebar>
      <SidebarLogo image="/static/lcdi_banner.png" alt="LCDI Banner" />
      <SidebarSection title="Seat Options">
        <SidebarModalItem link="/api/seat/take" icon={faSignInAlt} title="Take Seat" modal={<Modal />} />
        <SidebarModalItem link="/api/seat/return" icon={faSignOutAlt} title="Return Seat" modal={<Modal />} />
        <SidebarModalItem link="/api/seat/change" icon={faSync} title="Change Seat" modal={<Modal />} />
        <SidebarModalItem link="/api/seat/reserve" icon={faCalendarAlt} title="Reserve Seat" modal={<Modal />} />
      </SidebarSection>
      <SidebarSection title="User Options">
        <SidebarModalItem link="/api/user/register" icon={faPlusCircle} title="Register User" modal={<Modal />} />
        <SidebarModalItem link="/api/user/edit" icon={faUserEdit} title="Manage User" modal={<Modal />} />
        <SidebarModalItem link="/api/user/timesheet" icon={faClock} title="View Timesheet" modal={<Modal />} />
        {/* We use preFetch when we are navigating to another page rather than calling the modal */}
        <SidebarItem link="/admin" icon={faLock} title="Admin Panel" preFetch />
      </SidebarSection>
    </Sidebar>
    <div id="modal" />
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
