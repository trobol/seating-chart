import { useEffect, useState } from 'react';
import {
  Button, Header, Modal, ModalActions, ModalDescription, Form, FormGroup, FormInput, FormSelect, ModalContent, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const AddUserModal = ({ open, setOpen }) => {
  const [imageSource, setImageSource] = useState('/static/users/guest.jpg');
  const [allMajors, setAllMajors] = useState([]);
  const [allUserType, setAllUserType] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [name, setName] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfimation, setPasswordConfirmation] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [major, setMajor] = useState([]);
  const [userType, setUserType] = useState([]);
  const [projects, setProjects] = useState([]);

  const resetForm = () => {
    setImageSource('/static/users/guest.jpg');
    setName('');
    setPronoun('');
    setUserName();
    setEmail();
    setPassword();
    setPasswordConfirmation('');
    setPhone('');
    setImage(null);
    setMajor([]);
    setUserType([]);
    setProjects([]);
  };


  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageSource(URL.createObjectURL(e.target.files[0]));
  };
  const handleUserName = (_e, d) => {
    const regExp = new RegExp('^[a-zA-Z ]*$');
    if (regExp.test(d.value)) {
      setName(d.value);
      setUserName(d.value.toLowerCase().replace(' ', '.'));
    }
  };
  const handleSumbit = (_e) => {
    console.log({
      name, pronoun, username, email, password, phone, image, major, userType, projects,
    });
    if (password === passwordConfimation) {
      const userPostData = {
        name, pronoun, username, email, password, phone, major, userType, projects,
      };
      Promise.all([
        axios({
          method: 'post',
          url: '/api/admin/users',
          data: userPostData,
        }),
        axios({
          method: 'post',
          url: '/api/admin/users/image',
          data: { file: image },
          headers: {
            'content-type': 'multipart/form-data',
          },
        }),
      ])
        .then(res => console.log(res))
        .catch(err => console.error(err));
      resetForm();
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    Promise.all([
      axios.get('/api/users/majors'),
      axios.get('/api/users/user-types'),
      axios.get('/api/users/projects'),
    ]).then((res) => {
      setAllMajors(res[0].data.majors.map(e => ({ key: e.idmajor, text: e.major, value: e.idmajor })));
      setAllUserType(res[1].data.userType.map(e => ({ key: e.iduser_type, text: e.type, value: e.iduser_type })));
      setAllProjects(res[2].data.projects.map(e => ({ key: e.idprojects, text: e.project, value: e.idprojects })));
    });
  }, []);
  return (
    <Modal open={open} size="large" closeOnDimmerClick>
      <Header>Add User</Header>
      <ModalContent image scrolling>
        <Image wrapped size="medium" src={imageSource} />
        <ModalDescription>
          <Form>
            <FormGroup>
              <FormInput focus label="Name" onChange={handleUserName} required />
              <FormSelect focus options={Pronouns} label="Pronouns" onChange={(_e, d) => setPronoun(d.value)} required />
            </FormGroup>
            <FormInput focus label="Email" onChange={(_e, d) => setEmail(d.value)} />
            <FormInput focus label="Username" value={username} readOnly />
            <FormGroup>
              <FormInput focus type="password" label="Password" onChange={(_e, d) => setPassword(d.value)} required />
              <FormInput focus type="password" label="Confirm Password" onChange={(_e, d) => setPasswordConfirmation(d.value)} required />
            </FormGroup>
            <FormInput focus label="Primary Phone" placeholder="(XXX)XXX-XXXX" onChange={(_e, d) => setPhone(d.value)} required />
            <FormInput focus type="file" label="Image (Must be JPG)" onChange={handleFileChange} required />
            <FormSelect multiple options={allMajors} label="Majors" onChange={(_e, d) => setMajor(d.value)} />
            <FormSelect multiple options={allUserType} label="User Types" onChange={(_e, d) => setUserType(d.value)} required />
            <FormSelect multiple options={allProjects} label="Projects" onChange={(_e, d) => setProjects(d.value)} required />
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
        <Button type="submit" onClick={handleSumbit}>Submit</Button>
      </ModalActions>
    </Modal>
  );
};

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddUserModal;
