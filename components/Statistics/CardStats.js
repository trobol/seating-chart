import { Children } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const CardStats = ({ children }) => (
  <div className="stats__container">
    {Children.map(children, child => <Card>{child}</Card>)}
    <style>
      {`
    .stats__container{
      width: 100vw;
      display:flex;
      justify-content: space-evenly;
    }
    .stats__container *{
      margin:0px !important;
    }
  `}
    </style>
  </div>

);

CardStats.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

CardStats.defaultProps = {
  children: <div />,
};

export default CardStats;
