import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import SeatingChartLayout from '../components/SeatingChartLayout';
import Map from '../components/Map';
import {
  UserCard, UserCardProfile, UserDropdown,
} from '../components/UserCard';
import UserCardLogin from '../components/UserCard/UserCardLogin';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [date] = useState(new Date());
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [userOptions, setUserOptions] = useState([]);
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
  useEffect(() => {
    Promise.all([
      axios.get('/api/users/get-user-types'),
      axios.get('/api/users/clock'),
      axios.get('/api/seat/user'),
    ]).then((result) => {
      setUserOptions([
        result[0].data.types.includes('Admin')
          ? { title: 'Admin Panel', icon: 'lock', link: '/admin' }
          : null,
        { title: 'Timesheets', icon: 'calendar alternate', link: '/user/timesheets' },
        { title: 'Reservations', icon: 'calendar', link: '/user/reservations' },
        !_.isEmpty(result[1].data)
          ? { title: 'Clock Out', icon: 'clock', link: '/user/clock-out' }
          : { title: 'Clock In', icon: 'clock', link: '/user/clock-in' },
        !_.isEmpty(result[2].data)
          ? { title: 'Take Seat', icon: 'caret square right', link: '/user/take' }
          : { title: 'Leave Seat', icon: 'caret square left', link: '/user/leave' },
        { title: 'Manage Account', icon: 'edit', link: '/user/manage' },
        { title: 'Logout', icon: 'sign-out', link: '/logout' },
      ].filter((e => e !== null)));
    });
  }, [user.idusers]);
  return (
    <SeatingChartLayout>
      <Map link="/api/map/seats" />
      <UserCard>
        {(
          authenticated
            ? (
              <>
                <UserCardProfile image={user.image} name={user.name} time={date} />
                <UserDropdown open={open} setOpen={() => setOpen(!open)} listItems={userOptions} />
              </>
            )
            : <UserCardLogin />
        )}
      </UserCard>
    </SeatingChartLayout>
  );
};

export default Index;
