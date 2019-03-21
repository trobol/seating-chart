const Index = () => (
  <div>
    <p>Hello Next.js</p>
    <form action="/api/test-api" method="post">
      <input type="text" name="name" placeholder="name" />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default Index;
