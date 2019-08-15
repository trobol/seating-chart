import { useEffect, useState } from 'react';
import {
  Form, Image,
} from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const EditUserForm = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [allMajors, setAllMajors] = useState([]);
  const [allUserType, setAllUserType] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(undefined);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [pronoun, setPronoun] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [imageSource, setImageSource] = useState('');
  const [major, setMajor] = useState(null);
  const [userType, setUserType] = useState(null);
  const [project, setProject] = useState(null);
  const [isSumbitting, setIsSubmitting] = useState(false);

  const handleSumbit = () => {
    setIsSubmitting(true);
    const filename = user.image;
    const data = new FormData();
    data.append('file', image);
    data.append('filename', filename);
    data.append('idusers', user.idusers);

    const promises = [
      [name, pronoun, username, email].filter(e => !!e).length
        ? axios.post(isAdmin ? `/api/admin/users/edit/${user.idusers}` : '/api/users/edit/', {
          name, pronoun, username, email,
        })
        : null,
      axios.post(isAdmin ? `/api/admin/users/edit/${user.idusers}/projects` : '/api/users/edit/projects', { newIds: project }),
      axios.post(isAdmin ? `/api/admin/users/edit/${user.idusers}/major` : '/api/users/edit/major', { newIds: major }),
      axios.post(isAdmin ? `/api/admin/users/edit/${user.idusers}/user_type` : '/api/users/edit/user_type', { newIds: userType }),
      newPassword !== undefined && newPasswordConfirm !== undefined && newPassword === newPasswordConfirm
        ? axios.post(isAdmin ? `/api/admin/users/reset/${user.idusers}` : '/api/users/reset', { password, newPassword })
        : null,
    ].filter(e => e !== null);
    Promise.all([
      axios.post(isAdmin ? `/api/admin/users/edit/${user.idusers}` : '/api/users/edit/', {
        major, userType, project, name, pronoun, username, email, phone, image,
      }),
    ])
      .then(res => setIsSubmitting(false));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageSource(URL.createObjectURL(e.target.files[0]));
  };

  // Gets all the majors, user types, and projects
  useEffect(() => {
    Promise.all([
      axios.get('/api/users/majors'),
      axios.get('/api/users/user-types'),
      axios.get('/api/users/projects'),
    ]).then((res) => {
      setAllMajors(res[0].data.majors
        .map(e => ({ key: e.idmajor, text: e.major, value: e.idmajor })));
      setAllUserType(res[1].data.userType
        .map(e => ({ key: e.iduser_type, text: e.type, value: e.iduser_type })));
      setAllProjects(res[2].data.projects
        .map(e => ({ key: e.idprojects, text: e.project, value: e.idprojects })));
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
    passwordReset ? setPassword('ChangeMe!') : null;
  }, [passwordReset]);

  useEffect(() => {
    console.log({ newPassword, newPasswordConfirm });
    if (newPassword !== undefined && newPasswordConfirm !== undefined) {
      if (newPassword === newPasswordConfirm);
      else console.error({ newPassword, newPasswordConfirm }, ' do not match');
    }
  }, [newPassword, newPasswordConfirm]);

  return (
    <div className="user__edit__form__container">
      <Image src={user.path} className="user__edit__form__image" circular />
      <Form className="user__edit__form">
        <Form.Group>
          <Form.Input focus defaultValue={user.name} label="Name" onChange={(_e, { value }) => setName(value)} />
          <Form.Select defaultValue={user.pronoun} options={Pronouns} label="Pronouns" onChange={(_e, { value }) => setPronoun(value)} />
        </Form.Group>
        <Form.Input focus defaultValue={user.email} label="Email" onChange={(_e, { value }) => setEmail(value)} />
        <Form.Input focus defaultValue={user.username} label="Username" disabled onChange={(_e, { value }) => setUserName(value)} />
        {isAdmin
          ? (
            <Form.Group>
              <Form.Input focus type="password" label="Password" defaultValue={password} readOnly />
              <Form.Button className="reset__button" onClick={() => setPasswordReset(true)}>Reset Password</Form.Button>
              <style>
                {'.reset__button{align-self: flex-end}'}
              </style>
            </Form.Group>
          )
          : (
            <Form.Group>
              <Form.Input focus type="password" label="Current Password" onChange={e => setPassword(e.target.value)} />
              <Form.Input focus type="password" label="New Password" onBlur={e => setNewPassword(e.target.value)} />
              <Form.Input focus type="password" label="Confirm New Password" onBlur={e => setNewPasswordConfirm(e.target.value)} />
            </Form.Group>
          )
        }
        {!_.isNull(userType) ? <Form.Select multiple options={allMajors} defaultValue={major} label="Majors" onChange={(_e, d) => setMajor(d.value)} /> : <div /> }
        {!_.isNull(userType) ? <Form.Select multiple options={allUserType} defaultValue={userType} label="User Types" onChange={(_e, d) => setUserType(d.value)} /> : <div /> }
        {!_.isNull(project) ? <Form.Select multiple options={allProjects} defaultValue={project} label="Projects" onChange={(_e, d) => setProject(d.value)} /> : <div /> }
        <Form.Button label="Update" onClick={handleSumbit} disabled={isSumbitting}>Update</Form.Button>
      </Form>
      <style>
        {`
        .user__edit__form__container{
            display:grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas: "image image form";
            grid-column-gap: 1%;
        }
        .user__edit__form__image{
            min-width
            grid-area: image;
        }
        .user__edit__form{
            grid-area: form;
        }
        `}
      </style>
    </div>
  );
};

// <Form.Input focus label="Image Upload (Only JPG)" type="file" placeholder={user.image} value={imageSource} onChange={handleFileChange} />
// <Form.Input focus label="Primary Phone" placeholder="(XXX) XXX-XXXX" onChange={(_e, { value }) => setPhone(value)} />

EditUserForm.propTypes = {
  user: PropTypes.shape({
    idusers: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    pronoun: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    majors: PropTypes.string,
    projects: PropTypes.string,
    userTypes: PropTypes.string,
  }),
};

EditUserForm.defaultProps = {
  user: PropTypes.shape({
    majors: null,
    projects: null,
    userTypes: null,
  }),
};

export default EditUserForm;
