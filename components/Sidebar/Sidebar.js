import PropTypes from 'prop-types';

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

          background-color: #2e3e4e;
        }
    `}
    </style>
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  children: <div />,
};

export default Sidebar;
