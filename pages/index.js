import Layout from '../components/Layout';
import Map from '../components/map';

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
    <form action="/api/seat/take/" method="post">
      <input type="text" name="seat" placeholder="seat" />
      <input type="submit" value="Submit" />
    </form>
    <form action="/api/seat/return/" method="post">
      <input type="text" name="seat" placeholder="seat" />
      <input type="submit" value="Submit" />
    </form>
    <form action="api/seat/change/" method="post">
      <input type="text" name="id" placeholder="id" />
      <input type="text" name="returnSeat" placeholder="Return" />
      <input type="text" name="takeSeat" placeholder="Take" />
      <input type="submit" value="Submit" />
    </form>
    <Map />
  </Layout>
);

export default Index;
