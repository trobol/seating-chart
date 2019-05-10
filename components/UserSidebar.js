import { useState, useEffect } from 'react';
import axios from 'axios';
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
    axios.get('/api/users/get-user').then((res) => {
      if (!res.data.authenticated) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        setName(res.data.user.name);
        setAvatar(res.data.user.image);
      }
    });
  }, [authenticated]);

  return (
    <Sidebar>
      <SidebarLogo image="/static/lcdi_banner.png" alt="LCDI Banner" />
      <SidebarSection title="Seat Options">
        <SidebarModalItem link="/api/seat/take" icon="sign-in" title="Take Seat" modalContent={<TakeModal />} />
        <SidebarModalItem link="/api/seat/return" icon="sign-out" title="Return Seat" modalContent={<ReturnModal />} />
        <SidebarModalItem link="/api/seat/change" icon="sync" title="Change Seat" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarModalItem link="/api/seat/reserve" icon="calendar alternate" title="Reserve Seat" modalContent={<div><p>Hello World!</p></div>} />
      </SidebarSection>
      <SidebarSection title="User Options">
        <SidebarModalItem link="/api/user/register" icon="plus circle" title="Register User" modalContent={<div><p>Hello World!</p></div>} />
        <SidebarItem link="/user/manage" icon="edit" title="Manage User" preFetch />
        <SidebarModalItem link="/api/user/timesheet" icon="clock" title="View Timesheet" modalContent={<div><p>Hello World!</p></div>} />
        {/* We use preFetch when we are navigating to another page rather than calling the modal */}
        <SidebarItem link="/admin" icon="lock" title="Admin Panel" preFetch />
      </SidebarSection>
      {(
        authenticated
          ? <SidebarProfile avatar={avatar} name={name} />
          : <SidebarLogin icon="sign-in" />
        )}
    </Sidebar>
  );
};


export default UserSidebar;
