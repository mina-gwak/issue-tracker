export interface LabelCreateType {
  name: string;
  description: string;
  colorCode: string;
  textColor: string;
}

export interface LabelTabType extends LabelCreateType {
  id: number;
}

export interface LabelDataType {
  labelCount: number;
  labelDetails: LabelTabType[];
}

export interface TextColorArrType {
  id: string;
  colorCode: string;
  title: string;
}
