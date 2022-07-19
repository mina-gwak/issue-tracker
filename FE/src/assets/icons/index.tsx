import AlertCircle from '@assets/icons/alertCircle.svg';
import Archive from '@assets/icons/archive.svg';
import CheckBoxActive from '@assets/icons/checkBoxActive.svg';
import CheckBoxCircleActive from '@assets/icons/checkBoxCircleActive.svg';
import CheckBoxCircleInitial from '@assets/icons/checkBoxCircleInitial.svg';
import CheckBoxDisabled from '@assets/icons/checkBoxDisabled.svg';
import CheckBoxInitial from '@assets/icons/checkBoxInitial.svg';
import DeleteIcon from '@assets/icons/deleteIcon.svg';
import EditIcon from '@assets/icons/editIcon.svg';
import Github from '@assets/icons/github.svg';
import Label from '@assets/icons/label.svg';
import Milestone from '@assets/icons/milestone.svg';
import Paperclip from '@assets/icons/paperclip.svg'
import RefreshIcon from '@assets/icons/refreshIcon.svg';
import Search from '@assets/icons/search.svg';
import Select from '@assets/icons/select.svg';

export const Icons = {
  Archive,
  AlertCircle,
  CheckBoxActive,
  CheckBoxCircleActive,
  CheckBoxCircleInitial,
  CheckBoxDisabled,
  CheckBoxInitial,
  DeleteIcon,
  EditIcon,
  Github,
  Label,
  Milestone,
  Paperclip,
  RefreshIcon,
  Search,
  Select,
} as const;

export type IconsType = keyof typeof Icons;
