import { useEffect, useState } from 'react';
import {
  Button, Header, Modal, Form, Image,
} from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const EditUserModal = ({ open, setOpen, user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [password, setPassword] = useState('');
  const [allMajors, setAllMajors] = useState([]);
  const [allUserType, setAllUserType] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [major, setMajor] = useState(null);
  const [userType, setUserType] = useState(null);
  const [project, setProject] = useState(null);

  const handleSumbit = () => {
    Promise.resolve(axios.post(isAdmin ? `/api/admin/users/edit/${user.idusers}` : `/api/users/edit/${user.idusers}`))
      .then(res => console.log(res));
    setOpen(false);
  };

  // Gets all the majors, user types, and projects
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
  // Automatically fills in form with correct information
  // about a users major, user type, and projects
  useEffect(() => {
    const { majors, userTypes, projects } = user;
    if (!_.isUndefined(majors) && !_.isEmpty(majors) && !_.isEmpty(allMajors)) {
      const m = majors.split(',').reduce((acc, el) => [...acc, allMajors.find(elem => elem.text === el).value], []);
      setMajor(!_.isNull(m) ? m : []);
    }
    if (!_.isUndefined(userTypes) && !_.isEmpty(userTypes) && !_.isEmpty(allUserType)) {
      const ut = userTypes.split(',').reduce((acc, el) => [...acc, allUserType.find(elem => elem.text === el).value], []);
      setUserType(!_.isNull(ut) ? ut : []);
    }
    if (!_.isUndefined(projects) && !_.isEmpty(projects) && !_.isEmpty(allProjects)) {
      const p = projects.split(',').reduce((acc, el) => [...acc, allProjects.find(elem => elem.text === el).value], []);
      setProject(!_.isNull(p) ? p : []);
    }
  }, [allMajors, allProjects, allUserType, user]);
  useEffect(() => {
    Promise.resolve(axios.get('/api/users/get-user')).then((res) => {
      const { idusers } = res.data.user;
      if (user.idusers !== idusers) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
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
      <Modal.Content image>
        <Image wrapped size="medium" src={user.path} />
        <Modal.Description>
          <Form>
            <Form.Group>
              <Form.Input focus value={user.name} label="Name" />
              <Form.Select value={user.pronoun} options={Pronouns} label="Pronouns" />
            </Form.Group>
            <Form.Input focus value={user.email} label="Email" />
            <Form.Input focus value={user.username} label="Username" />
            {isAdmin
              ? (
                <Form.Group>
                  <Form.Input focus type="password" label="Password" value={password} readOnly />
                  <Form.Button className="reset__button" onClick={() => setPasswordReset(true)}>Reset Password</Form.Button>
                  <style>
                    {'.reset__button{align-self: flex-end}'}
                  </style>
                </Form.Group>
              )
              : (
                <Form.Group>
                  <Form.Input focus type="password" label="Current Password" />
                  <Form.Input focus type="password" label="New Password" />
                  <Form.Input focus type="password" label="Confirm New Password" />
                </Form.Group>
              )
            }
            <Form.Input focus label="Primary Phone" placeholder="(XXX)XXX-XXXX" />
            <Form.Input focus type="file" placeholder={user.image} />
            {!_.isNull(userType) ? <Form.Select multiple options={allMajors} defaultValue={major} label="Majors" onChange={(_e, d) => setMajor(d.value)} /> : <div /> }
            {!_.isNull(userType) ? <Form.Select multiple options={allUserType} defaultValue={userType} label="User Types" onChange={(_e, d) => setUserType(d.value)} /> : <div /> }
            {!_.isNull(project) ? <Form.Select multiple options={allProjects} defaultValue={project} label="Projects" onChange={(_e, d) => setProject(d.value)} /> : <div /> }
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>No</Button>
        <Button color="green" onClick={handleSumbit}>Yes</Button>
      </Modal.Actions>
    </>
  );
};

EditUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  user: PropTypes.shape({
    idusers: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pronoun: PropTypes.string.isRequired,
    majors: PropTypes.string,
    projects: PropTypes.string,
    userTypes: PropTypes.string,
  }),
};

EditUserModal.defaultProps = {
  user: PropTypes.shape({
    majors: null,
    projects: null,
    userTypes: null,
  }),
};

export default EditUserModal;
