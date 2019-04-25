/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Icon, Item } from 'semantic-ui-react';
import { TextColor, SidebarBGHover } from '../Constants';

const iconStyle = {
  paddingRight: '20px',
};

const SidebarItem = ({
  icon, link, title,
}) => (
  <div>
    <Item as="li">
      <Link prefetch href={link}>
        <a>
          <Icon name={icon} fitted style={iconStyle} />
          {title}
        </a>
      </Link>
    </Item>

    <style jsx>
      {`
        div :global(.item) {
          font-size: .9em;
          line-height: 40px;
          font-weight: 700;
          padding-left: 1em;
          background-color: inherit;
          color: ${TextColor}
        }
        div :global(.item a) {
          color: inherit;
          text-decoration: none;
        }

        div :global(.item:hover) {
          background-color: ${SidebarBGHover};
          color: white;
        }
    `}
    </style>
  </div>
);

SidebarItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarItem;
