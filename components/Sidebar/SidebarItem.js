/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextColor, SidebarBGHover } from '../Constants';

const iconStyle = {
  paddingRight: '20px',
};

const SidebarItem = ({
  icon, link, title,
}) => (
  <li className="sbItem">
    <Link prefetch href={link}>
      <a>
        <FontAwesomeIcon icon={icon} style={iconStyle} fixedWidth />
        {title}
      </a>
    </Link>

    <style jsx>
      {`
        .sbItem {
          font-size: .9em;
          line-height: 40px;
          font-weight: 700;
          text-indent: 24px;
          background-color: inherit;
          color: ${TextColor}
        }
        .sbItem a {
          color: inherit;
          text-decoration: none;
        }

        .sbItem:hover {
          background-color: ${SidebarBGHover};
          color: white;
        }
    `}
    </style>
  </li>
);

SidebarItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarItem;
