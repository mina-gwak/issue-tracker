import { LabelType } from '@type/issueType';

export interface writerType {
  optionName: string;
  imageUrl: string;
}

export interface milestonesType {
  milestoneName: string;
  allIssueCount: number;
  closedIssueCount: number;
}

export interface issueContentType {
  writerOutline: writerType;
  content: string;
  writtenTime: string;
}

export interface commentType {
  writerOutline: writerType;
  commentId: number;
  content: string;
  writtenTime: string;
  status: 'INITIAL' | 'CLOSED' | 'REOPEN';
}

export interface DetailIssueType {
  issueId: number;
  title: string;
  editable: boolean;
  issueOutline: issueContentType;
  writerOutline: writerType;
  assignees: writerType[];
  labels: LabelType[];
  milestoneInformation: milestonesType;
  commentOutlines: commentType[];
  open: boolean;
}
