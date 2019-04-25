import axios from 'axios';
import Layout from '../components/Layout';
// import Map from '../components/map';
// import SeatCircle from '../components/map/seatCircle';

const getReservations = () => {
  axios.get('/api/seat/reserve', { params: { seat: 1 } }).then((res) => {
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
    <form action="/user/manage" method="get">
      <input type="submit" value="Submit" />
    </form>
    <form action="api/seat/reserve" method="post">
      <div>Reserve your seat</div>
      <div>Expiration: </div>
      <input type="datetime-local" name="expires" />
      <div>Seat Number: </div>
      <input type="number" name="seat" />
      <div>Weekday: </div>
      <input type="number" name="weekday" />
      <div>Start Time: </div>
      <input type="time" name="start" />
      <div>End Time: </div>
      <input type="time" name="end" />
      <div>Reason: </div>
      <input type="text" name="reason" />
      <input type="submit" value="submit" />
    </form>
    <button type="button" onClick={() => getReservations()}>Click Me!</button>
  </Layout>
);

export default Index;
