import { useStore } from 'src/hooks';
import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';
import Layout from 'src/components/layout';

const PrivateLayout = () => {
  const { isAuthenticated } = useStore('authStore');
  const location = useLocation();

  return isAuthenticated ? (
      <Layout />
  ) : (
      <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );
};

export default observer(PrivateLayout);
