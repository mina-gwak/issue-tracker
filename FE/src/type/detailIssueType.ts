import { LabelType } from '@type/issueType';

export interface WriterType {
  optionName: string;
  imageUrl: string;
}

export interface MilestonesType {
  milestoneName: string;
  allIssueCount: number;
  closedIssueCount: number;
}

export interface issueContentType {
  writerOutline: WriterType;
  content: string;
  writtenTime: string;
}

export interface commentType {
  writerOutline: WriterType;
  commentId: number;
  content: string;
  writtenTime: string;
  status: 'INITIAL' | 'CLOSED' | 'REOPEN';
  editable: boolean;
}

export interface DetailIssueType {
  issueId: number;
  title: string;
  editable: boolean;
  issueOutline: issueContentType;
  writerOutline: WriterType;
  assignees: WriterType[];
  labels: LabelType[];
  milestoneInformation: MilestonesType;
  commentOutlines: commentType[];
  open: boolean;
}
