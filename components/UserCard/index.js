import UserDropdown from './UserDropdown';
import UserCardProfile from './UserCardProfile';
import UserCard from './UserCard';

const UserOptions = [
  { title: 'Clock In', icon: 'clock', link: '/' },
  { title: 'Manage Account', icon: 'edit', link: '/' },
  { title: 'Timesheets', icon: 'calendar alternate', link: '/' },
  { title: 'Login', icon: 'sign-in', link: '/' },
  { title: 'Logout', icon: 'sign-out', link: '/' },
  { title: 'Take Seat', icon: 'caret square right', link: '/' },
  { title: 'Leave Seat', icon: 'caret square left', link: '/' },
  { title: 'Change Seat', icon: 'retweet', link: '/' },
  { title: 'Admin Panel', icon: 'lock', link: '/' },
  { title: 'Reservations', icon: 'calendar', link: '/' },
  { title: 'Register', icon: 'add circle', link: '/' },
];

export {
  UserCard, UserCardProfile, UserDropdown, UserOptions,
};
