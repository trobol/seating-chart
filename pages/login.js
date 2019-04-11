import Layout from '../components/Layout';

const Login = () => (
  <Layout>
    <div className="login">
      <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  </Layout>
);

export default Login;
