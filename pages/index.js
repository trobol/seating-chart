import Layout from '../components/Layout';

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
    <form action="/api/wheniwork" method="post">
      <input type="text" name="id" placeholder="id" />
      <input type="hidden" name="endpoint" value="times/user/" />
      <input type="hidden" name="requestType" value="get" />
      <input type="submit" value="Submit" />
    </form>
  </Layout>
);

export default Index;
