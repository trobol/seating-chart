import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import Link from 'next/link';

const UserCardItem = ({ link, title, icon }) => (
  <List.Item key={title}>
    <List.Icon name={icon} />
    <List.Content>
      <Link prefetch href={link}>
        <a>{title}</a>
      </Link>
    </List.Content>
  </List.Item>
);

UserCardItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

UserCardItem.default = {
  link: '/',
};

export default UserCardItem;
