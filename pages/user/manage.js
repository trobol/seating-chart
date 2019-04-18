import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

const Manage = () => {
  const [user, setUser] = useState(null);
  const [majors, setMajors] = useState(null);
  const [projects, setProjects] = useState(null);

  // Users Effect
  useEffect(() => {
    axios.get('/api/users/get-user').then((res) => {
      if (res.data.authenticated) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  // Majors Effect

  return (
    <Layout>
      <form className="Manage__container">
        <input type="text" />
      </form>
    </Layout>
  );
};

export default Manage;
