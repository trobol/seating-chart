import PropTypes from 'prop-types';

const SidebarLogo = ({ image, alt }) => (
  <img src={image} alt={alt} />
);

SidebarLogo.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default SidebarLogo;
