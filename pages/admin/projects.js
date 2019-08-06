import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import HoursByWeek from '../../components/Chart/WeekChart';

const Projects = () => {
  const [projects, setProjects] = useState({});
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/projects/')).then((res) => {
      console.log({ res });
    });
  }, []);
  return (
    <HoursByWeek />
  );
};

export default Projects;
