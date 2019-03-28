import PropTypes from 'prop-types';
import { SidebarBackground } from '../Constants';

const Sidebar = ({ children }) => (
  <div className="Sidebar">
    {children}

    <style jsx>
      {`
        .Sidebar {
          display: flex;
          flex-direction: column;
          width: 200px;
          height: 100vh;

          background-color: ${SidebarBackground};
        }
    `}
    </style>
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Sidebar.defaultProps = {
  children: <div />,
};

export default Sidebar;
