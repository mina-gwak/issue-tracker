import { ReactComponent as AlertCircle } from '@assets/icons/alertCircle.svg';
import { ReactComponent as Archive } from '@assets/icons/archive.svg';
import { ReactComponent as CheckBoxActive } from '@assets/icons/checkBoxActive.svg';
import { ReactComponent as CheckBoxDisabled } from '@assets/icons/checkBoxDisabled.svg';
import { ReactComponent as CheckBoxInitial } from '@assets/icons/checkBoxInitial.svg';
import { ReactComponent as Github } from '@assets/icons/github.svg';
import { ReactComponent as Label } from '@assets/icons/label.svg';
import { ReactComponent as Milestone } from '@assets/icons/milestone.svg';
import { ReactComponent as Search } from '@assets/icons/search.svg';
import { ReactComponent as Select } from '@assets/icons/select.svg';

export const Icons = {
  Archive,
  AlertCircle,
  CheckBoxActive,
  CheckBoxDisabled,
  CheckBoxInitial,
  Github,
  Label,
  Milestone,
  Search,
  Select,
} as const;

export type IconsType = keyof typeof Icons;
