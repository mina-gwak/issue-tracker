import AddIssue from '@pages/AddIssue';
import Error from '@pages/Error';
import NotFound from '@pages/Error/NotFound';
import IssueDetail from '@pages/IssueDetail';
import IssueList from '@pages/IssueList';
import Label from '@pages/Label';
import Login from '@pages/Login';
import LoginCallback from '@pages/LoginCallback';
import Milestone from '@pages/Milestone';
import ProtectedRoute from '@router/ProtectedRoute';
import RedirectRoute from '@router/RedirectRoute';

export const routes = [
  { path: '/', element: <RedirectRoute /> },
  { path: '/login', element: <Login /> },
  { path: '/callback', element: <LoginCallback /> },
  { path: '/error', element: <Error /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/issue-list', element: <IssueList /> },
      { path: '/milestone', element: <Milestone /> },
      { path: '/label', element: <Label /> },
      { path: '/add-issue', element: <AddIssue /> },
      { path: '/issue-detail/:id', element: <IssueDetail /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];
