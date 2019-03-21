import PropTypes from 'prop-types';

const SidebarLogo = ({ image, alt }) => (
  <img className="logo" src={image} alt={alt} />
  /*
  <style jsx>
  {`
  .logo {
    background: white;
  }
`}
</style>
*/
);

SidebarLogo.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default SidebarLogo;
