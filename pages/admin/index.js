import { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import AdminReservationTable from '../../components/Table/Admin/Reservation';
import AdminUserTable from '../../components/Table/Admin/User';
import { PronounsChart, HoursbyMonth } from '../../components/Chart';
import { HoursWorked } from '../../components/Statistics';
import CardStats from '../../components/Statistics/CardStats';
import { ActivityFeed } from '../../components/Feed';
import Layout from '../../components/Layout';
import { AdminTimesheet } from '../../components/Table/Timesheets';
import AdminProject from '../../components/Table/Projects/AdminProject';
import { BaseModal } from '../../components/Modals';

const Admin = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [open, setOpen] = useState(false);
  const handleItemClick = (_e, { name }) => setActiveItem(name);
  const handleSeatsClick = () => {
    setOpen(true);
  };
  return (
    <Layout>
      <Menu pointing secondary className="admin__menu">
        <img src="/static/lcdi_banner.png" alt="LCDI BANNER" style={{ paddingLeft: '1vw', paddingRight: '1vw' }} />
        <Menu.Item name="home" active={activeItem === 'home'} onClick={handleItemClick} />
        <Menu.Item
          name="reservations"
          active={activeItem === 'reservations'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="users"
          active={activeItem === 'users'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="projects"
          active={activeItem === 'projects'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="timesheets"
          active={activeItem === 'timesheets'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="seats"
          active={activeItem === 'seats'}
          onClick={handleSeatsClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="return"
            active={activeItem === 'return'}
            link
            href="/"
          />
        </Menu.Menu>
      </Menu>
      {activeItem === 'home' ? (
        <>
          <CardStats>
            <HoursWorked length="day" />
            <HoursWorked length="week" />
            <HoursWorked length="month" />
          </CardStats>
          <div className="charts__container">
            <HoursbyMonth />
            <PronounsChart />
            <ActivityFeed />
            <style>
              {`
                .admin__menu{
                  background-color: white !important;
                }
                .charts__container{
                width: 100vw;
                display:grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto;
                }
                .charts_container *{
                    justify-self: center;
                }
            `}
            </style>
          </div>
        </>
      ) : <div />}
      {activeItem === 'reservations' ? <AdminReservationTable /> : <div />}
      {activeItem === 'users' ? <AdminUserTable /> : <div />}
      {activeItem === 'timesheets' ? <AdminTimesheet /> : <div />}
      {activeItem === 'projects' ? <AdminProject /> : <div />}
      <BaseModal open={open} setOpen={setOpen} active={open ? 'force-return' : null} setActive={() => {}} />
    </Layout>
  );
};

export default Admin;
