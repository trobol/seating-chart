import { useEffect, useState } from 'react';
import {
  Header, ModalDescription, Form, FormGroup, FormInput, FormSelect, ModalContent, Image,
} from 'semantic-ui-react';

const Pronouns = ['He/Him', 'She/Her', 'They/Them'].map(e => ({ key: e, text: e, value: e }));

const AddUserModal = () => {
  const [imageSource, setImageSource] = useState('/static/users/guest.jpg');
  const handleFileChange = e => setImageSource(URL.createObjectURL(e.target.files[0]));
  return (
    <>
      <Header>Add User</Header>
      <ModalContent image>
        <Image wrapped size="medium" src={imageSource} />
        <ModalDescription>
          <Form action="/api/admin/users/">
            <FormGroup>
              <FormInput focus label="Name" />
              <FormSelect focus options={Pronouns} label="Pronouns" />
            </FormGroup>
            <FormInput focus label="Email" />
            <FormInput focus label="Username" />
            <FormGroup>
              <FormInput focus type="password" label="Password" />
              <FormInput focus type="password" label="Confirm Password" />
            </FormGroup>
            <FormInput focus label="Primary Phone" placeholder="(XXX)XXX-XXXX" />
            <FormInput focus type="file" label="Image (Must be JPG)" onChange={handleFileChange} />
          </Form>
        </ModalDescription>
      </ModalContent>
    </>
  );
};

export default AddUserModal;
