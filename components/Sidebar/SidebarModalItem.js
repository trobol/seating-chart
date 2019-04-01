import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Modal from 'react-modal';
import { TextColor, SidebarBGHover } from '../Constants';

const iconStyle = {
  paddingRight: '20px',
};

const modalStyle = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '300px',
    background: 'white',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
};

Modal.setAppElement('#modal');

const SidebarModalItem = ({
  icon, title, modalContent,
}) => {
  const [open, setOpen] = useState(false);

  const parentSelector = () => document.querySelector('#modal');

  return (
    <li className="sbItem">
      <button type="button" className="listButton" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={icon} style={iconStyle} fixedWidth />
        {title}
      </button>
      <Modal
        className="Modal"
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel={title}
        parentSelector={parentSelector}
        style={modalStyle}
      >
        {modalContent}
        <button type="button" onClick={() => setOpen(false)}>Close</button>
      </Modal>
      <style jsx>
        {`
          .listButton {
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
  modalContent: PropTypes.node.isRequired,
};

export default SidebarModalItem;
