import Layout from '../components/Layout';
import Map from '../components/map';

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
    <form action="/api/table-api" method="post">
      <input type="text" name="name" placeholder="name" />
      <input type="hidden" name="endpoint" value="times/user/" />
      <input type="hidden" name="requestType" value="get" />
      <input type="submit" value="Submit" />
    </form>
    <form action="/user/manage" method="get">
      <input type="submit" value="Test" />
    </form>
    <Map />
  </Layout>
);

export default Index;
