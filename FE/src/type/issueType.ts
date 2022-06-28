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
  isOpen: boolean;
}

export interface IssuePopOverDataType {
  contents: string;
  registerTime: string;
  assignees: MemberType[];
}
