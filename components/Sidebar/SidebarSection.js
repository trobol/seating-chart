import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import { TextColor } from '../Constants';

const styles = {
  title: {
    fontWeight: 900,
    fontSize: '.8em',
    textIndent: '12px',
    color: `${TextColor}`,
    marginNottom: '-1px',
  },
};

const SidebarSection = ({ children, title }) => (
  <>
    <List className="sbSection">
      <List.Header style={styles.title}>{title}</List.Header>
      {children}
    </List>
    <style jsx>
      {`
        .title {
          
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
