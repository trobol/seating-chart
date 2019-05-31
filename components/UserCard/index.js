import {
  Image, Card, Icon, Feed,
} from 'semantic-ui-react';

const UserCard = () => (
  <Card className="user__card">
    <Card.Content>
      <Image src="static/users/KevinEaton.jpg" floated="left" size="mini" circular />
      <Card.Header>Kevin Eaton</Card.Header>
      <Card.Meta>Last Clocked: Time</Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Icon name="chevron down" />
      <Feed />
    </Card.Content>
    <style>
      {`
      .user__card{
        position: absolute !important;
        left:75%;
        top:3%;
      }
      .extra{
        text-align: center !important;
      }
    `}
    </style>
  </Card>

);

export default UserCard;
