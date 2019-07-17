import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

const Projects = () => {
  const [projects, setProjects] = useState({});
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/projects/')).then((res) => {
      console.log({ res });
    });
  }, []);
  return (
    <Layout>
      <Table />
    </Layout>
  );
};

export default Projects;
