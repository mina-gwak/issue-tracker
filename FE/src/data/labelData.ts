import { LabelTabType, TextColorArrType } from '@type/label';

export const defaultLabelData: LabelTabType = {
  id: 0,
  name: '레이블 이름',
  description: '설명(선택)',
  colorCode: '배경색상',
  textColor: '#000',
};

export const textColorArr: TextColorArrType[] = [
  { id: '1', colorCode: '#000', title: '어두운 색' },
  { id: '2', colorCode: '#fff', title: '밝은 색' },
];
