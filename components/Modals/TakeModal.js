const TakeModal = () => (
  <>
    <h1>Take Seat</h1>
    <form action="/api/seat/take" method="POST">
      <input type="text" name="seat" placeholder="Seat Number" />
      <input type="submit" value="Submit" />
    </form>
  </>
);

export default TakeModal;
