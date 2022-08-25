import { IconsType } from '@assets/icons';

export type isCheckedType = {
  (value: string): IconsType;
};

export type checkBoxClickHandlerType = {
  (value: string): () => void;
};
