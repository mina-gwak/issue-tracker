import Add from '@assets/icons/add.svg';
import AlertCircle from '@assets/icons/alertCircle.svg';
import Archive from '@assets/icons/archive.svg';
import Calendar from '@assets/icons/calendar.svg';
import CheckBoxActive from '@assets/icons/checkBoxActive.svg';
import CheckBoxCircleActive from '@assets/icons/checkBoxCircleActive.svg';
import CheckBoxCircleInitial from '@assets/icons/checkBoxCircleInitial.svg';
import CheckBoxDisabled from '@assets/icons/checkBoxDisabled.svg';
import CheckBoxInitial from '@assets/icons/checkBoxInitial.svg';
import CloseIssue from '@assets/icons/closeIssue.svg';
import CloseMilestone from '@assets/icons/closeMilestone.svg';
import DeleteIcon from '@assets/icons/deleteIcon.svg';
import EditIcon from '@assets/icons/editIcon.svg';
import Emoji from '@assets/icons/emoji.svg';
import Github from '@assets/icons/github.svg';
import Label from '@assets/icons/label.svg';
import Milestone from '@assets/icons/milestone.svg';
import Next from '@assets/icons/next.svg';
import OpenIssue from '@assets/icons/openIssue.svg';
import OpenMilestone from '@assets/icons/openMilestone.svg';
import Paperclip from '@assets/icons/paperclip.svg';
import Previous from '@assets/icons/previous.svg';
import RefreshIcon from '@assets/icons/refreshIcon.svg';
import Search from '@assets/icons/search.svg';
import Select from '@assets/icons/select.svg';
import XSquare from '@assets/icons/xSquare.svg';

export const Icons = {
  Add,
  AlertCircle,
  Archive,
  Calendar,
  CheckBoxActive,
  CheckBoxCircleActive,
  CheckBoxCircleInitial,
  CheckBoxDisabled,
  CheckBoxInitial,
  CloseIssue,
  CloseMilestone,
  DeleteIcon,
  EditIcon,
  Emoji,
  Github,
  Label,
  Milestone,
  Next,
  OpenIssue,
  OpenMilestone,
  Paperclip,
  Previous,
  RefreshIcon,
  Search,
  Select,
  XSquare,
} as const;

export type IconsType = keyof typeof Icons;
