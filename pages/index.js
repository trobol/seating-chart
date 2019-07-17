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
import TakeModal from '../components/Modals/TakeModal';
import ReturnModal from '../components/Modals/ReturnModal';
import useInterval from '../components/Util';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [takeModal, setTakeModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
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
      <SeatingMap link="/api/map/seats" />
      <style>{'.map{float:right;}'}</style>
      <UserCard>
        {(
          authenticated
            ? (
              <>
                <UserCardProfile
                  image={user.image}
                  name={user.name}
                  info={`Last Clocked In: ${`${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`}`}
                />
                <UserDropdown open={open} setOpen={() => setOpen(!open)}>
                  {isAdmin
                    ? <UserCardItem title="Admin Panel" icon="lock" link="admin" />
                    : <div />
                    }
                  <UserCardItem title="Timesheets" icon="calendar alternate" link="/user/timesheets" />
                  <UserCardItem title="Reservations" icon="calendar" link="/user/reservations" />
                  {isClockedIn
                    ? <UserCardAction title="Clock out" icon="clock" handleClick={() => Promise.resolve(axios.post('/api/users/clock-out'))} />
                    : <UserCardAction title="Clock in" icon="clock" handleClick={() => Promise.resolve(axios.post('/api/users/clock-in'))} /> }
                  {seat !== 0
                    ? <UserCardModalItem title="Return Seat" icon="caret square left" link="/user/return-seat" setOpen={setReturnModal} />
                    : <UserCardModalItem title="Take Seat" icon="caret square right" link="/user/take-seat" setOpen={setTakeModal} /> }
                  <UserCardItem title="Manage Account" icon="edit" link="/user/manage" />
                  <UserCardItem title="Logout" icon="sign-out" link="/logout" />
                </UserDropdown>
              </>
            )
            : <UserCardLogin />
        )}
      </UserCard>
      <ReturnModal open={returnModal} setOpen={setReturnModal} seat={seat} />
      <TakeModal open={takeModal} setOpen={setTakeModal} />
    </Layout>
  );
};

export default Index;
