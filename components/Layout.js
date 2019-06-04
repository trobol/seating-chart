import PropTypes from 'prop-types';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import UserSidebar from './UserSidebar';
import { SystemFonts } from './Constants';
import 'semantic-ui-css/semantic.min.css';
import AdminSidebar from './AdminSidebar';


config.autoAddCss = false;

const Layout = ({ children }) => (
  <div className="Layout">
    <Head>
      <title>LCDI - Seating Chart</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
    <div id="modal" />
    <main className="Content">
      {children}
    </main>
    <style jsx global>
      {`
        body {
          margin: 0;
          font-family: ${SystemFonts};
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
