import UserDropdown from './UserDropdown';
import UserCardProfile from './UserCardProfile';
import UserCard from './UserCard';

const UserOptions = [
  { name: 'Clock In', icon: 'clock', link: '/' },
  { name: 'Manage Account', icon: 'edit', link: '/' },
  { name: 'Timesheets', icon: 'calendar alternate', link: '/' },
  { name: 'Login', icon: 'sign-in', link: '/' },
  { name: 'Logout', icon: 'sign-out', link: '/' },
  { name: 'Take Seat', icon: 'caret square right', link: '/' },
  { name: 'Leave Seat', icon: 'caret square left', link: '/' },
  { name: 'Change Seat', icon: 'retweet', link: '/' },
  { name: 'Admin Panel', icon: 'lock', link: '/' },
  { name: 'Reservations', icon: 'calendar', link: '/' },
  { name: 'Register', icon: 'add circle', link: '/' },
];

export {
  UserCard, UserCardProfile, UserDropdown, UserOptions,
};
