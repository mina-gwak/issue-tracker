import Error from '@pages/Error';
import NotFound from '@pages/Error/NotFound';
import IssueList from '@pages/IssueList';
import Login from '@pages/Login';
import LoginCallback from '@pages/LoginCallback';
import ProtectedRoute from '@router/ProtectedRoute';
import RedirectRoute from '@router/RedirectRoute';

export const routes = [
  { path: '/', element: <RedirectRoute /> },
  { path: '/login', element: <Login /> },
  { path: '/callback', element: <LoginCallback /> },
  { path: '/error', element: <Error /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/issue-list', element: <IssueList /> }],
  },
  { path: '*', element: <NotFound /> },
];
