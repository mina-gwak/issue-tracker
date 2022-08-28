import { useRecoilState } from 'recoil';

import { IconsType } from '@assets/icons';
import { ICON_NAME } from '@components/common/Icon/constants';
import { issueOptionsState } from '@store/issueOptions';
import { checkBoxClickHandlerType, isCheckedType } from '@type/useOption';

interface UseDropDownType {
  type: 'assignees' | 'labels' | 'milestone';
}

const useIssueOptions = ({ type }: UseDropDownType) => {
  const [issueOptions, setIssueOptions] = useRecoilState(issueOptionsState);

  const isChecked: isCheckedType = (value) => {
    let checkBoxIcon: IconsType = ICON_NAME.CHECKBOX_CIRCLE_INITIAL;

    if (!value) return checkBoxIcon;

    if (type === 'milestone') {
      if (issueOptions[type] === value) checkBoxIcon = ICON_NAME.CHECKBOX_CIRCLE_ACTIVE;
    } else {
      if (issueOptions[type].includes(value)) checkBoxIcon = ICON_NAME.CHECKBOX_CIRCLE_ACTIVE;
    }

    return checkBoxIcon;
  };

  const checkBoxClickHandler: checkBoxClickHandlerType = (value) => () => {
    if (!value) return;

    if (type === 'milestone') {
      if (issueOptions[type] === value)
        setIssueOptions((prevIssueOptions) => ({ ...prevIssueOptions, [type]: '' }));
      else setIssueOptions((prevIssueOptions) => ({ ...prevIssueOptions, [type]: value }));
    } else {
      if (issueOptions[type].includes(value))
        setIssueOptions((prevIssueOptions) => ({
          ...prevIssueOptions,
          [type]: issueOptions[type].filter((item) => item !== value),
        }));
      else
        setIssueOptions((prevIssueOptions) => ({
          ...prevIssueOptions,
          [type]: [...issueOptions[type], value],
        }));
    }
  };

  return { isChecked, checkBoxClickHandler };
};

export default useIssueOptions;
