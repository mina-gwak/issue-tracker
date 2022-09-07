import { useEffect } from 'react';

import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import { IconsType } from '@assets/icons';
import { ICON_NAME } from '@components/common/Icon/constants';
import { editAssignees, editLabels } from '@query/issue';
import { issueOptionsState, issueOptionsTriggerState } from '@store/issueOptions';
import { checkBoxClickHandlerType, isCheckedType } from '@type/useOption';

interface UseDropDownType {
  type: 'assignees' | 'labels' | 'milestone';
  issueId?: number;
}

const useIssueOptions = ({ type, issueId }: UseDropDownType) => {
  const [issueOptions, setIssueOptions] = useRecoilState(issueOptionsState);
  const [issueOptionsTrigger, setIssueOptionsTrigger] = useRecoilState(issueOptionsTriggerState);

  const { mutate: mutateLabel } = useMutation(editLabels);

  const { mutate: mutateAssignees } = useMutation(editAssignees);

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

    setIssueOptionsTrigger((prev) => ({
      type,
      count: prev.count + 1,
    }));
  };

  useEffect(() => {
    if (issueId && issueOptionsTrigger.type === type) {
      if (type === 'labels') mutateLabel({ issueId, labels: issueOptions.labels });
      if (type === 'assignees') mutateAssignees({ issueId, assignees: issueOptions.assignees });
    }
  }, [issueOptionsTrigger.count]);

  return { isChecked, checkBoxClickHandler };
};

export default useIssueOptions;
