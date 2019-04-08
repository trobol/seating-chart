import Layout from '../components/Layout';
import Map from '../components/map';

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
    <form action="/api/seat/return/" method="post">
      <input type="text" name="seat" placeholder="seat" />
      <input type="hidden" name="endpoint" value="times/user/" />
      <input type="hidden" name="requestType" value="get" />
      <input type="submit" value="Submit" />
    </form>
    <Map />
  </Layout>
);

export default Index;
