import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

const Projects = () => {
  const url = '/api/admin/projects/';
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectProject] = useState(null);
  useEffect(() => {
    Promise.resolve(axios.get(url))
      .then((res) => {
        const { results } = res.data.response;
        setProjects(results);
      }).catch(error => console.error(error));
  }, []);
  return (
    <Layout>
      <div id="projects" />
      <div id="selected-project" />
    </Layout>
  );
};

export default Projects;
