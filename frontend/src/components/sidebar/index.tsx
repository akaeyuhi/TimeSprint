import { Stack, List } from '@mui/material';
import Logo from '../logo';
import { Link } from 'react-router-dom';
import {
  GridView,
  Groups2Rounded,
  AssignmentRounded,
  DirectionsRunRounded,
  PersonRounded,
  LockPersonRounded,
} from '@mui/icons-material';
import SidebarItem from './components/sidebar-item';
import { styles } from './styles';
const Sidebar = () => {
  const menuItems = [
    { path: '/home', title: 'Home', icon: GridView },
    { path: '/teams', title: 'Teams', icon: Groups2Rounded },
    { path: '/tasks', title: 'Tasks', icon: AssignmentRounded },
    { path: '/activities', title: 'Activities', icon: DirectionsRunRounded },
    { path: '/user', title: 'User', icon: PersonRounded },
    { path: '/admin', title: 'Admin panel', icon: LockPersonRounded },
  ];

  return (
    <Stack sx={styles.sidebarWrapper}>
      <Link to="/">
        <Logo />
      </Link>
      <List sx={styles.list}>
        {menuItems.map(({ path, title, icon: Icon }) => (
          <SidebarItem key={path} path={path} label={title} icon={<Icon />} />
        ))}
      </List>
    </Stack>
  );
};

export default Sidebar;
