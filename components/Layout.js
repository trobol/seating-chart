import PropTypes from 'prop-types';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import UserSidebar from './UserSidebar';
import { SystemFonts } from './Constants';


config.autoAddCss = false;

const Layout = ({ children }) => (
  <CookiesProvider>
    <div className="Layout">
      <Head>
        <title>LCDI - Seating Chart</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <UserSidebar />
      <div id="modal" />
      <main className="Content">
        {children}
      </main>
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
          font-family: ${SystemFonts};
        }
    `}
    </style>
  </CookiesProvider>

);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: <div />,
};

export default Layout;
