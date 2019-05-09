import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  faSignInAlt, faSignOutAlt, faSync,
  faCalendarAlt, faPlusCircle, faUserEdit, faLock,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Icon } from 'semantic-ui-react';
import {
  Sidebar, SidebarLogo, SidebarSection, SidebarItem, SidebarModalItem, SidebarProfile, SidebarLogin,
} from './Sidebar';

const AdminSidebar = () => {
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
      <SidebarSection title="Main">
        <SidebarItem link="/admin" icon="sign-in" title="Dashboard" preFetch />
        <SidebarItem link="/admin/report" icon="sign-out" title="Report" preFetch />
        <SidebarItem link="/admin/logs" icon="sync" title="Logs" preFetch />
      </SidebarSection>
      <SidebarSection title="Seating Chart Options">
        <SidebarItem link="/admin/users" icon="plus circle" title="Users" preFetch />
        <SidebarItem link="/admin/guests" icon="edit" title="Guests" preFetch />
        <SidebarItem link="/admin/force-return" icon="edit" title="Force Return" preFetch />
        <SidebarItem link="/admin/timesheet" icon="edit" title="Timesheet" preFetch />
        <SidebarItem link="/admin/projects" icon="edit" title="Projects" preFetch />
        <SidebarItem link="/user/reservations" icon="edit" title="Reservations" preFetch />
      </SidebarSection>
      {(
        authenticated
          ? <SidebarProfile avatar={avatar} name={name} />
          : <SidebarLogin icon="sign-in" />
        )}
    </Sidebar>
  );
};


export default AdminSidebar;
