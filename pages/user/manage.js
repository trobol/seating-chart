import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

const Manage = () => {
  const [user, setUser] = useState({});
  const [majors, setMajors] = useState([]);
  const [projects, setProjects] = useState([]);

  // Users Effect
  useEffect(() => {
    Promise.all(
      [axios.get('/api/users/get-user'),
        axios.get('/api/users/get-majors'),
        axios.get('/api/users/get-projects')],
    ).then((res) => {
      setUser(res[0].data.user);
      setMajors(res[1].data.majors);
      setProjects(res[2].data.projects);
      console.log(res[0].data.user);
      console.log(res[1].data.majors);
      console.log(res[2].data.projects);
    });
  }, []);

  return (
    <Layout>
      <form className="Manage__container">
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" initialvalue={user.name} />
        <label htmlFor="pronouns">Pronouns</label>
      </form>
    </Layout>
  );
};

export default Manage;
