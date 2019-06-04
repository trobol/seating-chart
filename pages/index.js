import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Layout from '../components/Layout';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [userOptions, setUserOptions] = useState([
    { title: 'Manage Account', icon: 'edit', link: '/' },
    { title: 'Timesheets', icon: 'calendar alternate', link: '/' },
    { title: 'Take Seat', icon: 'caret square right', link: '/' },
    { title: 'Leave Seat', icon: 'caret square left', link: '/' },
    { title: 'Change Seat', icon: 'retweet', link: '/' },
    { title: 'Reservations', icon: 'calendar', link: '/' },
    { title: 'Logout', icon: 'sign-out', link: '/' },
  ]);
  useEffect(() => {
    axios.get('/api/users/get-user').then((res) => {
      if (!res.data.authenticated) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        setUser(res.data.user);
        /* Promise.all([
          axios.get('/api/users/get-user-types'),
          axios.get('/api/users/clock'),
          // TODO: Does the User have a seat;
        ]).then((result) => {
          setIsAdmin(result[0].data.types.includes('Admin'));
          setIsClockedIn(!_.isEmpty(result[1].data));
        }); */
      }
    });
  }, []);
  useEffect(() => {
    Promise.all([
      axios.get('/api/users/get-user-types'),
      axios.get('/api/users/clock'),
      // TODO: Does the User have a seat;
    ]).then((result) => {
      setUserOptions([
        ...userOptions,
        !_.isEmpty(result[1].data)
          ? { title: 'Clock Out', icon: 'clock', link: '/' }
          : { title: 'Clock In', icon: 'clock', link: '/' },
        result[0].data.types.includes('Admin')
          ? { title: 'Admin Panel', icon: 'lock', link: '/' }
          : null,

      ].filter((e => e !== null)));
      setIsAdmin(result[0].data.types.includes('Admin'));
      setIsClockedIn(!_.isEmpty(result[1].data));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.idusers]);
  return (
    <Layout>
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
    </Layout>
  );
};

export default Index;
