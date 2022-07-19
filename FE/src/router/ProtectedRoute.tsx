import { Navigate, Outlet } from 'react-router-dom';

import Header from '@components/Header';
import { useLocalStorage } from '@hooks/useLocalStorage';

const ProtectedRoute = () => {
  const [accessToken] = useLocalStorage('accessToken', '');

  return accessToken ? (
    <div>
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to={'login'} replace />
  );
};

export default ProtectedRoute;
