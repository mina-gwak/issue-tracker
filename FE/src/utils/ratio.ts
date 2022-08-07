export const progress = (openIssueCount: number, closeIssueCount: number) => {
  if (!(openIssueCount + closeIssueCount)) return 0;
  return Math.ceil((closeIssueCount / (openIssueCount + closeIssueCount)) * 100);
};
