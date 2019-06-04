
import { List, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const UserDropdown = ({ listItems, open, setOpen }) => (
  <>
    {open ? (
      <Card.Content extra>
        <List>
          {listItems.map(item => (
            <List.Item>
              <List.Icon name={item.icon} />
              <List.Content><a href={item.link}>{item.name}</a></List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Content>
    ) : null}
    <Card.Content extra className="icon__content" onClick={setOpen}>
      <Icon name={open ? 'chevron up' : 'chevron down'} />
    </Card.Content>
    <style>
      {`
      .icon__content{
        text-align: center !important;
        padding:0px !important;
        height 25px !important;
      }
    `}
    </style>
  </>
);
UserDropdown.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default UserDropdown;
