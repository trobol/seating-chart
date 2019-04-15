const ReturnModal = () => (
  <>
    <h1>Return Seat</h1>
    <form action="/api/seat/return" method="POST">
      <input type="text" name="seat" placeholder="Seat Number" />
      <input type="submit" value="Submit" />
    </form>
  </>
);

export default ReturnModal;
