import Layout from '../components/Layout';

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
    <form action="/api/testApi" method="post">
      <input type="text" name="name" placeholder="name" />
      <input type="hidden" name="endpoint" value="times/user/" />
      <input type="hidden" name="requestType" value="get" />
      <input type="submit" value="Submit" />
    </form>
  </Layout>
);

export default Index;
