import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import Modal from 'react-modal';
import { TextColor, SidebarBGHover } from '../Constants';

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

const styles = {
  button: {
    border: 'none',
    background: 'inherit',
    color: 'inherit',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    paddingLeft: '1em',
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
      <Button
        type="button"
        icon
        style={styles.button}
        className="listButton"
        onClick={() => setOpen(true)}
      >
        <Icon name={icon} fitted style={{ paddingRight: 20 }} />
        {title}
      </Button>
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
          .sbItem {
            font-size: .9em;
            line-height: 40px;
            font-weight: 700;
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
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  modalContent: PropTypes.node.isRequired,
};

export default SidebarModalItem;
