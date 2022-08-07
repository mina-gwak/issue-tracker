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
  MILESTONE: () => `/api/milestones/list`,
  MILESTONE_CREATE: () => `/api/milestones/`,
  MILESTONE_UPDATE: (id: number) => `/api/milestones/${id}`,
  MILESTONE_DELETE: (id: number) => `/api/milestones/${id}`,
  MILESTONE_OPEN_CLOSE: (id: number) => `/api/milestones/${id}/change`,
  FILE_UPLOAD: '/api/common/upload',
} as const;
