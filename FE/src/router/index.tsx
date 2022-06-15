import IssueList from '@pages/IssueList';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import ProtectedRoute from '@router/ProtectedRoute';
import RedirectRoute from '@router/RedirectRoute';

export const routes = [
  { path: '/', element: <RedirectRoute /> },
  { path: '/login', element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/issue-list', element: <IssueList /> }],
  },
  { path: '*', element: <NotFound /> },
];
