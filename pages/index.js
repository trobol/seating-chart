// import Layout from '../components/Layout';
import Map from '../components/map';

const Index = () => (
  <div>
    <p>Hello Next.js</p>
    <form action="/api/table-api" method="post">
      <input type="text" name="name" placeholder="name" />
      <input type="hidden" name="endpoint" value="times/user/" />
      <input type="hidden" name="requestType" value="get" />
      <input type="submit" value="Submit" />
    </form>
    <Map />
  </div>
);

export default Index;
