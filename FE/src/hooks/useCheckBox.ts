import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import useIssues from '@hooks/useIssues';
import { isAllCheckedState, isCheckedState } from '@store/checkbox';

const useCheckBox = () => {

  const [isCheckedItems, setIsCheckedItems] = useRecoilState(isCheckedState);
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedState);
  const resetCheckedItems = useResetRecoilState(isCheckedState);

  const issues = useIssues();

  const getIsChecked = (id: number) => {
    return isCheckedItems.has(id);
  };

  const toggleCheckItem = (id: number) => {
    if (isCheckedItems.has(id)) {
      setIsCheckedItems((prevCheckedItems) => {
        prevCheckedItems.delete(id);
        return new Set([...prevCheckedItems]);
      });
    } else {
      setIsCheckedItems((prevCheckedItems) => new Set([...prevCheckedItems, id]));
    }
  };

  const toggleIsAllChecked = () => {
    if (isAllChecked) {
      setIsCheckedItems(new Set());
    } else {
      if (issues) {
        const ids = issues.issueCoverResponses.map((item) => item.issueId);
        setIsCheckedItems(new Set([...ids]));
      }
    }
    setIsAllChecked((prevIsAllChecked) => !prevIsAllChecked);
  };

  useEffect(() => {
    if (issues) setIsAllChecked(() => isCheckedItems.size === issues.issueCoverResponses.length);
  }, [isCheckedItems]);

  return {
    isCheckedItems,
    isAllChecked,
    resetCheckedItems,
    toggleCheckItem,
    toggleIsAllChecked,
    getIsChecked,
  };
};

export default useCheckBox;
