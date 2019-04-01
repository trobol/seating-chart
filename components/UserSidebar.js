import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  faSignInAlt, faSignOutAlt, faSync,
  faCalendarAlt, faPlusCircle, faUserEdit, faLock,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useCookies } from 'react-cookie';
import {
  Sidebar, SidebarLogo, SidebarSection, SidebarItem, SidebarModalItem,
} from './Sidebar';
import { TakeSeatModal, LoginModal } from './Modals';

const UserSidebar = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [cookies, setCookie] = useCookies(['scUID']);

  useEffect(() => {
    if (cookies != null) {
      axios.get(`/api/logged-in?uid=${cookies.scUID}`).then((res) => {
        // Need to decide on a response format to check for then if its logged in
        // run `setLoggedIn(true)`;
      });
    }
  }, [cookies]);

  return (
    <Sidebar>
      <SidebarLogo image="/static/lcdi_banner.png" alt="LCDI Banner" />
      <SidebarSection title="Seat Options">
        <SidebarModalItem link="/api/seat/take" icon={faSignInAlt} title="Take Seat" modalContent={loggedIn ? <TakeSeatModal /> : <LoginModal />} />
        <SidebarModalItem link="/api/seat/return" icon={faSignOutAlt} title="Return Seat" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarModalItem link="/api/seat/change" icon={faSync} title="Change Seat" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarModalItem link="/api/seat/reserve" icon={faCalendarAlt} title="Reserve Seat" modalContent={<div><p>Hello World!</p></div>} />
      </SidebarSection>
      <SidebarSection title="User Options">
        <SidebarModalItem link="/api/user/register" icon={faPlusCircle} title="Register User" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarModalItem link="/api/user/edit" icon={faUserEdit} title="Manage User" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarModalItem link="/api/user/timesheet" icon={faClock} title="View Timesheet" modalContent={<div><p>Hello World!</p></div>} />
        {/* We use preFetch when we are navigating to another page rather than calling the modal */}
        <SidebarItem link="/admin" icon={faLock} title="Admin Panel" preFetch />
      </SidebarSection>
    </Sidebar>
  );
};


export default UserSidebar;
