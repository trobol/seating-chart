import axios from 'axios';
import Layout from '../components/Layout';

const Login = () => {
  const login = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    axios.post('/api/login', formData).then((res) => {
      console.log(res);
    });
  };
  return (
    <Layout>
      <div className="login">
        <form action="/api/login" method="post">
          <input type="text" id="username" placeholder="Enter Username" />
          <input type="password" id="password" placeholder="Enter Password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </Layout>
  );
};

export default Login;
