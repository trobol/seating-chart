import axios from 'axios';
import Layout from '../components/Layout';
import Map from '../components/map';
import SeatCircle from '../components/map/seatCircle';

<<<<<<< HEAD
function getReservationData() {
  axios.get('/api/seat/reserve/').then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
  });
}
=======
const getReservations = () => {
  console.log('clicked');
  axios.get('/api/seat/reserve').then((res) => {
    console.log(res);
  });
};

>>>>>>> e2ef48c4f201742fdbb25b7deabd108e646d0c7e
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
<<<<<<< HEAD
    <button type="button" onClick={() => getReservationData()}> Click Me!</button>
=======
    <button type="button" onClick={() => getReservations()}>Click Me!</button>
>>>>>>> e2ef48c4f201742fdbb25b7deabd108e646d0c7e
  </Layout>
);

export default Index;
