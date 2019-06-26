import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ActionModal = ({
  children, icon, title, setOpen,
}) => (
  <>
    <Button onClick={() => setOpen(true)}>
      {icon ? <Icon name={icon} /> : <div />}
      {title}
    </Button>
    {children}
  </>
);

ActionModal.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  title: PropTypes.string,
  setOpen: PropTypes.func.isRequired,
};

ActionModal.defaultProps = {
  children: <div />,
  icon: null,
  title: null,
};

export default ActionModal;
