import PropTypes from 'prop-types';
import { TextColor } from '../Constants';

const SidebarSection = ({ children, title }) => (
  <>
    <p className="title">{title}</p>
    <ul className="sbSection">
      {children}
    </ul>
    <style jsx>
      {`
        .title {
          font-weight: 900;
          font-size: .8em;
          text-indent: 12px;
          color: ${TextColor};
          margin-bottom: -1px;
        }

        .sbSection {
          display: flex;
          flex-direction: column;
          padding: 0;
          list-style: none;
          margin-top: .3em;
          margin-bottom: .5em;
        }
      `}
    </style>
  </>
);

SidebarSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string.isRequired,
};

SidebarSection.defaultProps = {
  children: <div />,
};

export default SidebarSection;
