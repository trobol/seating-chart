/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import SeatingMap from '../components/Map';
import {
  UserCard, UserCardProfile, UserDropdown, UserCardItem, UserCardModalItem, UserCardAction,
} from '../components/UserCard';
import UserCardLogin from '../components/UserCard/UserCardLogin';
import Layout from '../components/Layout';
import useInterval from '../components/Util';
import { BaseModal } from '../components/Modals';
import OnlineUsersFeed from '../components/Feed/OnlineUsersFeed';
import UserLogFeed from '../components/Feed/UserLogFeed';
import ReservationProgess from '../components/Progress/Reservation';
import UserReservationTable from '../components/Table/User/Reservation';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [seat, setSeat] = useState(0);
  const [date] = useState(new Date());
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get('/api/users/get-user').then((res) => {
      if (!res.data.authenticated) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        setUser(res.data.user);
      }
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => console.log(activeModal !== 'retrun' ? user : seat), [activeModal]);

  useInterval(() => {
    Promise.all([
      axios.get('/api/users/get-user-types'),
      axios.get('/api/users/clock'),
      axios.get('/api/seat/user'),
    ]).then(([adminRes, clockRes, seatRes]) => {
      !_.isEmpty(adminRes.data.types) ? setIsAdmin(adminRes.data.types.includes('Admin')) : setIsAdmin(false);
      !_.isEmpty(clockRes.data.clock) ? setIsClockedIn(clockRes.data.clock[0].count > 0) : setIsClockedIn(false);
      !_.isEmpty(seatRes.data.seat) ? setSeat(seatRes.data.seat[0].sid) : setSeat(0);
    });
  }, 1500);
  return (
    <Layout>
      <div className="grid__container">
        <div className="timesheet">
          <ReservationProgess />
          <UserLogFeed />
        </div>
        <div className="map__container">
          <SeatingMap link="/api/map/seats" />
          <UserCard>
            {(
          authenticated
            ? (
              <>
                <UserCardProfile
                  image={user.path}
                  name={user.name}
                  info={`Last Clocked In: ${`${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`}`}
                />
                <UserDropdown open={open} setOpen={() => setOpen(!open)}>
                  {isAdmin
                    ? <UserCardItem title="Admin Panel" icon="lock" link="admin" />
                    : <div />
                    }
                  {isClockedIn
                    ? <UserCardAction title="Clock out" icon="clock" handleClick={() => Promise.resolve(axios.post('/api/users/clock-out'))} />
                    : <UserCardAction title="Clock in" icon="clock" handleClick={() => Promise.resolve(axios.post('/api/users/clock-in'))} /> }
                  {seat !== 0
                    ? <UserCardModalItem title="Return Seat" icon="caret square left" link="/user/return-seat" onClick={() => setActiveModal('return')} />
                    : <UserCardModalItem title="Take Seat" icon="caret square right" link="/user/take-seat" onClick={() => setActiveModal('take')} /> }
                  <UserCardItem title="Manage Account" icon="edit" link="/user/manage" />
                  <UserCardItem title="Logout" icon="sign-out" link="/logout" />
                </UserDropdown>
              </>
            )
            : <UserCardLogin />
        )}
          </UserCard>
        </div>
        <div className="active__user">
          <OnlineUsersFeed />
        </div>
      </div>
      <style>
        {`.grid__container{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: 
          "left map right"
      }
      .map__conatiner{
        grid-area: map;
      }
      .timesheet{
        grid-area: left;
      }
      .active__user{
        grid-area: right;
      }`}
      </style>
      <BaseModal open={modal} setOpen={setModal} active={activeModal} setActive={setActiveModal} data={activeModal !== 'return' ? user : seat} />
    </Layout>
  );
};

export default Index;
