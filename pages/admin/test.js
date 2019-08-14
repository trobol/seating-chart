import { Button } from 'semantic-ui-react';
import axios from 'axios';
import Layout from '../../components/Layout';

const Test = () => {
  const newIds = [2, 5];
  const name = 'Keaton';
  const pronoun = 'He/Him';
  const username = 'Keaton01';
  const email = 'kevin.eaton@mymail.champlain.edu';

  const handleClick = () => {
    Promise.resolve(axios.post('/api/admin/users/edit/1/projects/', { newIds }))
      .then((res) => {
        console.log({ res });
      });
  };
  const handleClickInfo = () => {
    Promise.resolve(axios.post('/api/admin/users/edit/9', {
      name, pronoun, username, email,
    }))
      .then((res) => {
        console.log({ res });
      });
  };
  return (
    <Layout>
      <Button onClick={handleClick} content="Click Me" />
      <Button onClick={handleClickInfo} content="User info" />
    </Layout>
  );
};

export default Test;
