import { Navigate } from 'react-router-dom';

import { useLocalStorage } from '@hooks/useLocalStorage';

const RedirectRoute = () => {
  const [accessToken] = useLocalStorage('accessToken', '');

  return accessToken ? <Navigate to={'issue-list'} replace /> : <Navigate to={'login'} replace />;
};

export default RedirectRoute;
