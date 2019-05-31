import Layout from '../components/Layout';
import Map from '../components/Map';
import UserCard from '../components/UserCard';

const Index = () => (
  <Layout>
    <Map link="/api/map/seats" />
    <UserCard />
  </Layout>
);

export default Index;
