/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import SeatingMap from '../components/Map';
import {
  UserCard, UserCardProfile, UserDropdown, UserCardItem, UserCardModalItem, UserCardAction, UserCardRemoteAction
} from '../components/UserCard';
import UserCardLogin from '../components/UserCard/UserCardLogin';
import Layout from '../components/Layout';
import useInterval from '../components/Util';
import { BaseModal } from '../components/Modals';
import OnlineUsersFeed from '../components/Feed/OnlineUsersFeed';
import UserLogFeed from '../components/Feed/UserLogFeed';
import ReservationProgess from '../components/Progress/Reservation';
import { BackgroundColor } from '../components/Constants';

import './style.css'

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
    getUser();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => console.log(activeModal !== 'return' ? user : seat), [activeModal]);

  function getUser() {
    axios.get('/api/user').then((res) => {
      if (!res.data.authenticated) {
        setAuthenticated(false);
      } else {
        setUser(res.data.user);
        setAuthenticated(true);
      }
    });
  }
  function login(user) {
    if (user) {
      getUser();
    } else {
      setAuthenticated(false);
      setUser({});
    }

  }

  useInterval(() => {
    Promise.all([
      axios.get('/api/user/type'),
      axios.get('/api/user/clock'),
      axios.get('/api/user/seat'),
    ]).then(([adminRes, clockRes, seatRes]) => {
      !_.isEmpty(adminRes.data.types) ? setIsAdmin(adminRes.data.type === 'Admin') : setIsAdmin(false);
      !_.isEmpty(clockRes.data.clock) ? setIsClockedIn(clockRes.data !== undefined) : setIsClockedIn(false);
      !_.isEmpty(seatRes.data.seat) ? setSeat(seatRes.data.seat.id) : setSeat(0);
    });
  }, 1500);


  return (

    <Layout>
      <div className="grid__container">
        {authenticated
          ? (
            <div className="timesheet">
              <ReservationProgess />
              <UserLogFeed />
            </div>
          ) : (<div />)}
        <div className="map__container">
          <SeatingMap link="/api/seat/reservations" />
          <UserCard>
            {(
              authenticated
                ? (
                  <>
                    <UserCardProfile
                      image={user.path}
                      name={user.name}
                      info={`Last Clocked In: ${`${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`}`}
                      clockedIn={isClockedIn}
                    />
                    <UserDropdown open={open} setOpen={() => setOpen(!open)}>
                      {isAdmin
                        ? <UserCardItem title="Admin Panel" icon="lock" link="admin" />
                        : <div />
                      }
                      {isClockedIn
                        ? <UserCardRemoteAction title="Clock out" icon="clock" url="/api/user/clock-out" method="post" callback={(response) => { if (response.status === 200) setIsClockedIn(false) }} />
                        : <UserCardRemoteAction title="Clock in" icon="clock" url="/api/user/clock-in" method="post" callback={(response) => { if (response.status === 200) setIsClockedIn(true) }} />}

                      {seat !== 0
                        ? <UserCardModalItem title="Return Seat" icon="caret square left" link="/user/return-seat" onClick={() => setActiveModal('return')} />
                        : <UserCardModalItem title="Take Seat" icon="caret square right" link="/user/take-seat" onClick={() => setActiveModal('take')} />}
                      <UserCardItem title="Manage Account" icon="edit" link="/user/manage" />
                      <UserCardRemoteAction title="Logout" icon="sign-out" url="/api/logout" callback={(response) => { if (response.status === 200) login() }} />
                    </UserDropdown>
                  </>
                )
                : <UserCardLogin callback={login} />
            )}
          </UserCard>
        </div>
        {authenticated
          ? (
            <div className="active__user">
              <OnlineUsersFeed />
            </div>
          )
          : (
            <div />
          )}

      </div>
      <BaseModal open={modal} setOpen={setModal} active={activeModal} setActive={setActiveModal} data={activeModal !== 'return' ? user : seat} />
    </Layout>
  );
};

export default Index;
