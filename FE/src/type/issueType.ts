export interface LabelType {
  labelName: string;
  labelColor: string;
  textColor: string;
}

export interface MilestoneType {
  id: number;
  title: string;
}

export interface MemberType {
  id: number;
  name: string;
  imgUrl: string;
}

export interface IssueType {
  title: string;
  labelCoverResponses: LabelType[];
  issueId: number;
  writer: string;
  writerImage: string;
  modificationTime: string;
  milestoneName: string;
  opened: boolean;
}

export interface IssueDataType {
  issueCoverResponses: IssueType[];
  openIssueCount: number;
  closeIssueCount: number;
  labelCount: number;
  milestoneCount: number;
}

export interface IssuePopOverDataType {
  title: string;
  content: string;
  writtenTime: string;
  assignedMe: boolean;
}
