import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  faSignInAlt, faSignOutAlt, faSync,
  faCalendarAlt, faPlusCircle, faUserEdit, faLock,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  Sidebar, SidebarLogo, SidebarSection, SidebarItem, SidebarModalItem, SidebarProfile, SidebarLogin,
} from './Sidebar';
import { TakeModal, ReturnModal } from './Modals';

const UserSidebar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    axios.get('/api/get-user').then((res) => {
      if (!res.data.authenticated) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        setName(res.data.name);
        setAvatar(res.data.avatar);
      }
    });
  }, [authenticated]);

  return (
    <Sidebar>
      <SidebarLogo image="/static/lcdi_banner.png" alt="LCDI Banner" />
      <SidebarSection title="Seat Options">
        <SidebarModalItem link="/api/seat/take" icon={faSignInAlt} title="Take Seat" modalContent={<TakeModal />} />
        <SidebarModalItem link="/api/seat/return" icon={faSignOutAlt} title="Return Seat" modalContent={<ReturnModal />} />
        <SidebarModalItem link="/api/seat/change" icon={faSync} title="Change Seat" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarModalItem link="/api/seat/reserve" icon={faCalendarAlt} title="Reserve Seat" modalContent={<div><p>Hello World!</p></div>} />
      </SidebarSection>
      <SidebarSection title="User Options">
        <SidebarModalItem link="/api/user/register" icon={faPlusCircle} title="Register User" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarItem link="/user/manage" icon={faUserEdit} title="Manage User" preFetch />
        <SidebarModalItem link="/api/user/timesheet" icon={faClock} title="View Timesheet" modalContent={<div><p>Hello World!</p></div>} />
        {/* We use preFetch when we are navigating to another page rather than calling the modal */}
        <SidebarItem link="/admin" icon={faLock} title="Admin Panel" preFetch />
      </SidebarSection>
      { authenticated ? <SidebarProfile avatar={avatar} name={name} /> : <SidebarLogin icon={faSignInAlt} /> }
    </Sidebar>
  );
};


export default UserSidebar;
