import { List, Stack } from '@mui/material';
import Logo from '../logo';
import { Link } from 'react-router-dom';
import {
  AssignmentRounded,
  DirectionsRunRounded,
  GridView,
  Groups2Rounded,
  LockPersonRounded,
  PersonRounded,
} from '@mui/icons-material';
import SidebarItem from './components/sidebar-item';
import { styles } from './styles';
import { useStore } from 'src/hooks';
import { AdminRole } from 'src/models/roles.enum';

const Sidebar = () => {
  const { role } = useStore('authStore').auth.user;
  const menuItems = [
    { path: '/app/home', title: 'Home', icon: GridView },
    { path: '/app/teams', title: 'Teams', icon: Groups2Rounded },
    { path: '/app/tasks', title: 'Tasks', icon: AssignmentRounded },
    {
      path: '/app/activities',
      title: 'Activities',
      icon: DirectionsRunRounded,
    },
    { path: '/app/user', title: 'User', icon: PersonRounded },
  ];

  if (role === AdminRole.ADMIN) {
    menuItems.push({
      path: '/app/admin',
      title: 'Admin panel',
      icon: LockPersonRounded,
    });
  }

  return (
    <Stack sx={styles.sidebarWrapper}>
      <Link to="/welcome">
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
