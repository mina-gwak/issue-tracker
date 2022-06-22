export interface LabelType {
  id: number;
  name: string;
  backgroundColor: string;
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

export interface IssueListType {
  id: number;
  num: number;
  title: string;
  labels: LabelType[];
  milestone: MilestoneType;
  assignees: MemberType[];
  author: MemberType;
  isOpen: boolean;
  time: Date;
}
