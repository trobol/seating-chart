import { useEffect, useState } from 'react';
import {
  Header, ModalDescription, Form, FormGroup, FormInput, FormSelect, FormButton, ModalContent, Image,
} from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const EditUserModal = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [password, setPassword] = useState('');
  useEffect(() => {
    Promise.resolve(axios.get('/api/users/get-user')).then((res) => {
      const { idusers } = res.data.user;
      if (user.idusers !== idusers) {
        setIsAdmin(true);
      }
    });
  }, [user.idusers]);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    passwordReset ? setPassword('ChangeMe!') : setPassword('');
  }, [passwordReset]);
  return (
    <>
      <Header>Edit User</Header>
      <ModalContent image>
        <Image wrapped size="medium" src={`/static/users/${user.image}.jpg`} />
        <ModalDescription>
          <Form action={isAdmin ? `/api/admin/users/edit/${user.idusers}` : `/api/users/edit/${user.idusers}`}>
            <FormGroup>
              <FormInput focus value={user.name} label="Name" />
              <FormSelect focus value={user.pronoun} options={Pronouns} label="Pronouns" />
            </FormGroup>
            <FormInput focus value={user.email} label="Email" />
            <FormInput focus value={user.username} label="Username" />
            {isAdmin
              ? (
                <FormGroup>
                  <FormInput focus type="password" label="Password" value={password} readOnly />
                  <FormButton onClick={setPasswordReset(true)}>Reset Password</FormButton>
                </FormGroup>
              )
              : (
                <FormGroup>
                  <FormInput focus type="password" label="Current Password" />
                  <FormInput focus type="password" label="New Password" />
                  <FormInput focus type="password" label="Confirm New Password" />
                </FormGroup>
              )
            }
            <FormInput focus label="Primary Phone" placeholder="(XXX)XXX-XXXX" />
            <FormInput focus type="file" placeholder={user.image} />
          </Form>
        </ModalDescription>
      </ModalContent>

    </>
  );
};

EditUserModal.propTypes = {
  user: PropTypes.shape({
    idusers: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pronoun: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditUserModal;
