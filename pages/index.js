import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Map from '../components/Map';
import {
  UserCard, UserCardProfile, UserDropdown, UserOptions,
} from '../components/UserCard';
import UserCardLogin from '../components/UserCard/UserCardLogin';

const Index = () => {
  const [open, setOpen] = useState(false);
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
  }, [authenticated]);
  return (
    <Layout>
      <Map link="/api/map/seats" />
      <UserCard>
        {(
        authenticated
          ? (
            <>
              <UserCardProfile image={user.image} name={user.name} time={date} />
              <UserDropdown open={open} setOpen={() => setOpen(!open)} listItems={UserOptions} />
            </>
          )
          : <UserCardLogin />
        )}
      </UserCard>
    </Layout>
  );
};

export default Index;
