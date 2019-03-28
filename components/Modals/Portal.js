import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React from 'react';

class Portal extends React.Component {
  componentDidMount() {
    const { children, selector } = this.props;
    this.element = document.querySelector(selector);
    this.children = { children };
    console.log('yeet');
  }

  render() {
    if (this.element === undefined) {
      return null;
    }
    return ReactDOM.createPortal(this.children, this.element);
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  selector: PropTypes.string.isRequired,
};

export default Portal;
