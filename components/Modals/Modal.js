import PropTypes from 'prop-types';

const Modal = ({ children }) => (
  <div className="Modal">
    <p> Hey </p>
    {children}
  </div>
);


Modal.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: <div />,
};

export default Modal;
