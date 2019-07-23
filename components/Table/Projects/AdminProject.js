import { useEffect, useState } from 'react';
import {
  Grid, Menu, Segment, Divider,
} from 'semantic-ui-react';
import axios from 'axios';
import AdminProjectTable from './AdminProjectTable';

const AdminProject = () => {
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [users, setUsers] = useState(null);
  const [selectUser, setSelectedUser] = useState('');
  const handleItemClick = (e, { name }) => setSelectedProject(name);
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/projects')).then((res) => {
      console.log(res.data.projects);
      setProjects(res.data.projects);
    });
  }, []);
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/projects/user/')).then((res) => {
      console.log(res.data.users);
      setUsers(res.data.users);
    });
  }, []);
  return (
    <>
      <Grid className="project__grid" style={{ width: '90vw', paddingLeft: '5vw' }}>
        <Grid.Column width={4} style={{ paddingBottom: '0px' }}>
          <Menu fluid vertical tabular style={{ maxHeight: '100vh', overflowY: 'auto' }} className="project__grid">
            {projects !== null
              ? Object.keys(projects).map(project => <Menu.Item key={project} name={project} active={selectedProject === project} onClick={handleItemClick}></Menu.Item>)
              : <div />
            }
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12} style={{ paddingBottom: '0px' }}>
          <Segment>
            { projects !== null && projects[selectedProject] !== undefined
              ? <AdminProjectTable users={projects[selectedProject].users} project={selectedProject} />
              : <div />
            }
            <Divider />
          </Segment>
        </Grid.Column>
      </Grid>
      <style>{'.project__grid::-webkit-scrollbar{display:none}'}</style>
    </>
  );
};

export default AdminProject;
