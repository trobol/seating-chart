import PropTypes from 'prop-types';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import { SystemFonts, BackgroundColor } from './Constants';
import 'semantic-ui-css/semantic.min.css';


config.autoAddCss = false;

const SeatingChartLayout = ({ children }) => (
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
          background: ${BackgroundColor};
        }
    `}
    </style>
  </div>

);

SeatingChartLayout.propTypes = {
  children: PropTypes.node,
};

SeatingChartLayout.defaultProps = {
  children: <div />,
};

export default SeatingChartLayout;
