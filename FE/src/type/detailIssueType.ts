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

export interface commentType {
  commentUserOutline: writerType;
  commentId: number;
  content: string;
  writtenTime: string;
  editable: boolean;
}

export interface DetailIssueType {
  issueId: number;
  title: string;
  content: string;
  writtenTime: string;
  writerOutline: writerType;
  assignees: writerType[];
  labels: LabelType[];
  milestoneInformation: milestonesType;
  commentOutlines: commentType[];
  imageUrls: string[];
  open: boolean;
}
