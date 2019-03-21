import Layout from '../components/Layout';

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
    <form action="/api/test-api" method="post">
      <input type="text" name="name" placeholder="name" />
      <input type="submit" value="Submit" />
    </form>
  </Layout>
);

export default Index;
