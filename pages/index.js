import axios from 'axios';
import Layout from '../components/Layout';
import Map from '../components/map';
import SeatCircle from '../components/map/seatCircle';

function getReservationData() {
  axios.get('/api/seat/reserve/').then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
  });
}
const Index = () => (
  <Layout>
    <form action="/api/seat/take/" method="post">
      <div>Take: </div>
      <input type="text" name="seat" placeholder="seat" />
      <input type="submit" value="Submit" />
    </form>
    <form action="/api/seat/return/" method="post">
      <div>Return</div>
      <input type="text" name="seat" placeholder="seat" />
      <input type="submit" value="Submit" />
    </form>
    <form action="/user/manage" method="get">
      <input type="submit" value="Submit" />
    </form>
    <button type="button" onClick={() => getReservationData()}> Click Me!</button>
  </Layout>
);

export default Index;
