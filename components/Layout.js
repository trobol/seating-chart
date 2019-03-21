import PropTypes from 'prop-types';
import { Sidebar, SidebarLogo } from './Sidebar';

const Layout = ({ children }) => (
  <div className="Layout">
    <Sidebar>
      <SidebarLogo image="/static/lcdi_banner.png" alt="LCDI Banner" />
    </Sidebar>
    <div className="Content">
      {children}
    </div>

    <style jsx>
      {` 
        .Layout {
          display: flex;
          flex-direction: row;
        }

        .Content {
          display: flex;
          flex-direction: column;
          width: calc(100vw - 200px);
          height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
        }
    `}
    </style>
    <style jsx global>
      {`
        body {
          margin: 0;
        }
    `}
    </style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: <div />,
};

export default Layout;
