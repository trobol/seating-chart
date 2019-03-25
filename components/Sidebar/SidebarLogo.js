import PropTypes from 'prop-types';

const SidebarLogo = ({ image, alt, styles }) => (
  <div className="logo__container">
    <img className="logo" src={image} alt={alt} style={styles} />
    <style jsx>
      {`
      .logo__container {
        display: flex;
        justify-content: center;
        align-items: center;

        background: white;
        height: 75px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      }

      .logo {
        margin 10px 0 10px 0;
        height: auto;
        width: 90%;
      }
    `}
    </style>
  </div>

);

SidebarLogo.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default SidebarLogo;
