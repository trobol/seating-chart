import axios from 'axios';
import Layout from '../components/Layout';
// import Map from '../components/map';
// import SeatCircle from '../components/map/seatCircle';

const getReservations = () => {
  console.log('clicked');
  axios.get('/api/seat/reserve').then((res) => {
    console.log(res);
  });
};

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
    <form action="api/seat/change/" method="post">
      <div>Change: </div>
      <input type="text" name="id" placeholder="id" />
      <input type="text" name="returnSeat" placeholder="Return" />
      <input type="text" name="takeSeat" placeholder="Take" />
      <input type="submit" value="Submit" />
    </form>
    <form action="/user/manage" method="get">
      <input type="submit" value="Test" />
    </form>
    <button type="button" onClick={() => getReservations()}>Click Me!</button>
  </Layout>
);

export default Index;
