import { useState, useEffect } from 'react';
import { Form, Input, Dropdown } from 'formsy-semantic-ui-react';
import axios from 'axios';
import Layout from '../../components/Layout';

const Pronouns = [
  {
    key: 'He/Him',
    text: 'He/Him',
    value: 'He/Him',
  },
  {
    key: 'She/Her',
    text: 'She/Her',
    value: 'She/Her',
  },
  {
    key: 'They/Them',
    text: 'They/Them',
    value: 'They/Them',
  },
];

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
      <Form>
        <Input type="text" name="name" value={user.name} label="Full Name" />
        <Dropdown name="pronoun" placeholder="Your Pronouns" value={user.pronoun} selection options={Pronouns} />
      </Form>
    </Layout>
  );
};

export default Manage;
