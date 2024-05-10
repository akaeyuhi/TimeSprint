import { useStore } from 'src/hooks';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicLayout = () => {
  const { isAuthenticated } = useStore('authStore');
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return isAuthenticated ? <Navigate to={from} replace /> : <Outlet />;
};

export default observer(PublicLayout);
