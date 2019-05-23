import { useEffect, useState } from 'react';
import {
  Button, Header, Modal, ModalActions, ModalDescription, Form, FormGroup, FormInput, FormSelect, ModalContent, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const AddUserModal = ({ open, setOpen }) => {
  const [imageSource, setImageSource] = useState('/static/users/guest.jpg');
  const [majors, setMajors] = useState([]);
  const [userType, setUserType] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userName, setUserName] = useState('');
  const [userPronouns, setUserPronouns] = useState('');
  const [userUserName, setUserUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordConfimation, setPasswordConfirmation] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userMajor, setUserMajor] = useState([]);
  const [userUserType, setUserUserType] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const handleFileChange = e => setImageSource(URL.createObjectURL(e.target.files[0]));
  const handleUserName = (_e, d) => {
    const regExp = new RegExp('^[a-zA-Z ]*$');
    if (regExp.test(d.value)) {
      setUserName(d.value);
      setUserUserName(d.value.toLowerCase().replace(' ', '.'));
    }
  };
  const handleSumbit = (e) => {
    userPostData = {};
  };
  useEffect(() => {
    Promise.all([
      axios.get('/api/users/majors'),
      axios.get('/api/users/user-types'),
      axios.get('/api/users/projects'),
    ]).then((res) => {
      setMajors(res[0].data.majors.map(e => ({ key: e.idmajor, text: e.major, value: e.idmajor })));
      setUserType(res[1].data.userType.map(e => ({ key: e.iduser_type, text: e.type, value: e.iduser_type })));
      setProjects(res[2].data.projects.map(e => ({ key: e.idprojects, text: e.project, value: e.idprojects })));
    });
  }, []);
  return (
    <Modal open={open} size="large" closeOnDimmerClick>
      <Header>Add User</Header>
      <ModalContent image scrolling>
        <Image wrapped size="medium" src={imageSource} />
        <ModalDescription>
          <Form onSubmit={handleSumbit}>
            <FormGroup>
              <FormInput focus label="Name" onChange={handleUserName} />
              <FormSelect focus options={Pronouns} label="Pronouns" onChange={(_e, d) => setUserPronouns(d.value)} />
            </FormGroup>
            <FormInput focus label="Email" onChange={(_e, d) => setUserEmail(d.value)} />
            <FormInput focus label="Username" value={userUserName} readOnly />
            <FormGroup>
              <FormInput focus type="password" label="Password" onChange={(_e, d) => setUserPassword(d.value)} />
              <FormInput focus type="password" label="Confirm Password" onChange={(_e, d) => setPasswordConfirmation(d.value)} />
            </FormGroup>
            <FormInput focus label="Primary Phone" placeholder="(XXX)XXX-XXXX" onChange={(_e, d) => setUserPhone(d.value)} />
            <FormInput focus type="file" label="Image (Must be JPG)" onChange={handleFileChange} />
            <FormSelect multiple options={majors} label="Majors" onChange={(_e, d) => setUserMajor(d.value)} />
            <FormSelect multiple options={userType} label="User Types" onChange={(_e, d) => setUserUserType(d.value)} />
            <FormSelect multiple options={projects} label="Projects" onChange={(_e, d) => setUserProjects(d.value)} />
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button type="submit" onClick={() => setOpen(false)}>Submit</Button>
      </ModalActions>
    </Modal>
  );
};

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddUserModal;
