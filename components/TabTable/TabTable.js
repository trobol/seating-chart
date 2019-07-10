import { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import TabTableMenu from './TabTableMenu';
import TabTableMenuItem from './TabTableMenuItem';
import AdminReservationTable from '../Table/Admin/Reservation';
import AdminUserTable from '../Table/Admin/User';
import { PronounsChart, HoursbyMonth } from '../Chart';
import { HoursWorked } from '../Statistics';
import CardStats from '../Statistics/CardStats';
import { ActivityFeed } from '../Feed';


const TabTable = () => {
  const [activeItem, setActiveItem] = useState('home');
  const handleItemClick = (_e, { name }) => setActiveItem(name);

  return (
    <>
      <TabTableMenu>
        <TabTableMenuItem name="home" active={activeItem === 'home'} onClick={handleItemClick} />
        <TabTableMenuItem
          name="reservations"
          active={activeItem === 'reservations'}
          onClick={handleItemClick}
        />
        <TabTableMenuItem
          name="users"
          active={activeItem === 'users'}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <TabTableMenuItem
            name="return"
            active={activeItem === 'return'}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </TabTableMenu>
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
                .charts__container{
                width: 100vw;
                display:flex;
                justify-content: spaced-evenly;
                align-items: center;
                flex-wrap: wrap;
                }
                .charts__container * {
                    width: ${100 / 2}vw;
                }
            `}
            </style>
          </div>
        </>
      ) : <div />}
      {activeItem === 'reservations' ? <AdminReservationTable /> : <div />}
      {activeItem === 'users' ? <AdminUserTable /> : <div />}
    </>
  );
};

export default TabTable;
