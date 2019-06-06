/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const UserDropdown = ({
  children, open, setOpen,
}) => (
  <>
    {open ? (
      <Card.Content extra>
        <List>
          {children}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
UserDropdown.defaultProps = {
  children: <div />,
};
export default UserDropdown;
