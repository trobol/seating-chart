import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Portal } from 'react-portal';
import { TextColor, SidebarBGHover } from '../Constants';

const iconStyle = {
  paddingRight: '20px',
};

const SidebarModalItem = ({ icon, title, modal }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="sbItem">
      <button type="button" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={icon} style={iconStyle} fixedWidth />
        {title}
        {open && (
          <Portal node={document && document.querySelector('#modal')}>
            {modal}
          </Portal>
        )}
      </button>
      <style jsx>
        {`
          button {
            background: none;
            border: none;
            background: inherit;
            padding: 0;
            color: inherit;
            font-size: .9em;
            font-weight: 700;
            font-family: inherit;
            font-size: inherit;
            text-decoration: none;
            cursor: pointer;
          }
          .sbItem {
            font-size: .9em;
            line-height: 40px;
            font-weight: 700;
            text-indent: 24px;
            background-color: inherit;
            color: ${TextColor};
            cursor: pointer;
          }

          .sbItem:hover {
            background-color: ${SidebarBGHover};
            color: white;
          }
        `}
      </style>
    </li>
  );
};

SidebarModalItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  modal: PropTypes.node.isRequired,
};

export default SidebarModalItem;
