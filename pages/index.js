import { useState } from 'react';
import Layout from '../components/Layout';
import Map from '../components/Map';
import {
  UserCard, UserCardProfile, UserDropdown, UserOptions,
} from '../components/UserCard';

const Index = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <Map link="/api/map/seats" />
      <UserCard>
        <UserCardProfile image="static/users/KevinEaton.jpg" name="Kevin Eaton" time={(new Date().toLocaleDateString())} />
        <UserDropdown open={open} setOpen={() => setOpen(!open)} listItems={UserOptions} />
      </UserCard>
    </Layout>
  );
};

export default Index;
