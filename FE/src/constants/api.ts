export const API = {
  GITHUB_LOGIN_CALLBACK: '/api/oauth/login/github/callback',
  ISSUE: '/api/issues',
  ISSUE_POPOVER: (issueId: number) => `/api/issues/${issueId}/popUp`,
  FILTER: (type: string) => `/api/${type}`,
  STATUS_UPDATE: () => `/api/issues/status`,
  LABEL: () => `/api/labels/list`,
  LABEL_CREATE: () => `/api/labels/`,
  LABEL_UPDATE: (id: number) => `/api/labels/${id}`,
  LABEL_DELETE: (id: number) => `/api/labels/${id}`,
} as const;
