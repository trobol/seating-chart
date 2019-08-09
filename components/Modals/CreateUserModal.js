import { useEffect, useState } from 'react';
import {
  Button, Header, Modal, Form, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const CreateUserModal = ({ open, setOpen }) => {
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
  const handleUserName = (_, { value }) => {
    const regExp = new RegExp(/^([a-z])(?:[a-z'\-]+) ([a-z'\- ]+)/i);
    const match = value.toLowerCase().match(regExp);
    if (match) {
      setName(value);
      setUserName(match[1] + match[2].replace(/[ \-']/g, ''));
    }
  };
  const handleSumbit = () => {
    const filename = name.replace(' ', '');
    const data = new FormData();
    data.append('file', image);
    data.append('filename', filename);
    if (password === passwordConfimation) {
      const userPostData = {
        name,
        pronoun,
        username,
        email,
        password,
        phone,
        major,
        userType,
        projects,
        image,
        imageSource,
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
          data,
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
    <>
      <Header>Add User</Header>
      <Modal.Content image scrolling>
        <Image wrapped size="medium" src={imageSource} />
        <Modal.Description>
          <Form>
            <Form.Group>
              <Form.Input focus label="Name" onChange={handleUserName} required />
              <Form.Select focus options={Pronouns} label="Pronouns" onChange={(_e, d) => setPronoun(d.value)} required />
            </Form.Group>
            <Form.Input focus label="Email" onChange={(_e, d) => setEmail(d.value)} />
            <Form.Input focus label="Username" value={username} readOnly />
            <Form.Group>
              <Form.Input focus type="password" label="Password" onChange={(_e, d) => setPassword(d.value)} required />
              <Form.Input focus type="password" label="Confirm Password" onChange={(_e, d) => setPasswordConfirmation(d.value)} required />
            </Form.Group>
            <Form.Input focus label="Primary Phone" placeholder="(XXX)XXX-XXXX" onChange={(_e, d) => setPhone(d.value)} required />
            <Form.Input focus type="file" label="Image (Must be JPG)" onChange={handleFileChange} required />
            <Form.Select multiple options={allMajors} label="Majors" onChange={(_e, d) => setMajor(d.value)} />
            <Form.Select multiple options={allUserType} label="User Types" onChange={(_e, d) => setUserType(d.value)} required />
            <Form.Select multiple options={allProjects} label="Projects" onChange={(_e, d) => setProjects(d.value)} required />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
        <Button type="submit" onClick={handleSumbit}>Submit</Button>
      </Modal.Actions>
    </>
  );
};

CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CreateUserModal;
