import { Navigate } from 'react-router-dom';

const RedirectRoute = () => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to={'issue-list'} replace /> : <Navigate to={'login'} replace />;
};

export default RedirectRoute;
