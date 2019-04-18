import PropTypes from 'prop-types';
import { TextColor } from '../Constants';

const SidebarProfile = ({ avatar, name }) => (
  <div className="Sidebar__profile">
    <img className="Sidebar__avatar" alt="User Avatar" src={avatar} />
    <p className="Sidebar__username">{name}</p>

    <style jsx>
      {`
        .Sidebar__profile {
          position: absolute;
          bottom: 12px;
          margin-left: 1.1rem;
  
          display: flex;
          flex-direction: row;
  
          align-items: center;
  
          color: ${TextColor}
        }
  
        .Sidebar__avatar {
          border-radius: 50%;
          height: 2em;
          width: 2em;
        }
  
        .Sidebar__username {
          color: inherit;
          font-weight: 700;
          font-size: .9em;
          margin-left: 12px;
        }
      `}
    </style>
  </div>
);

SidebarProfile.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default SidebarProfile;
