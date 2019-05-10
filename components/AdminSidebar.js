import { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  Sidebar, SidebarLogo, SidebarSection, SidebarItem, SidebarProfile, SidebarLogin,
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
        <SidebarItem link="/admin" icon="tachometer alternate" title="Dashboard" preFetch />
        <SidebarItem link="/admin/report" icon="file alternate" title="Report" preFetch />
        <SidebarItem link="/admin/logs" icon="clipboard list" title="Logs" preFetch />
      </SidebarSection>
      <SidebarSection title="Seating Chart Options">
        <SidebarItem link="/admin/users" icon="users" title="Users" preFetch />
        <SidebarItem link="/admin/guests" icon="user" title="Guests" preFetch />
        <SidebarItem link="/admin/force-return" icon="key" title="Force Return" preFetch />
        <SidebarItem link="/admin/timesheet" icon="business time" title="Timesheet" preFetch />
        <SidebarItem link="/admin/projects" icon="list" title="Projects" preFetch />
        <SidebarItem link="/admin/reservations" icon="history" title="Reservations" preFetch />
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
