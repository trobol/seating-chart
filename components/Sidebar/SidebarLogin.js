import { useState, useEffect } from 'react';
import axios from 'axios';

import { TextColor } from '../Constants';

const SidebarLogin = () => {
  const [username, setUsername] = useState('User');
  const [avatar, setAvatar] = useState('/static/users/guest.jpg');

  useEffect(() => {
    axios.get('/api/get-user').then((res) => {
      setUsername(res.data.username);
      setAvatar(res.data.avatar);
    });
  }, [username, avatar]);


  return (
    <div className="Sidebar__login">
      <img className="Sidebar__avatar" alt="User Avatar" src={avatar} />
      <p className="Sidebar__username">{username}</p>

      <style jsx>
        {`
        .Sidebar__login {
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
};

export default SidebarLogin;
