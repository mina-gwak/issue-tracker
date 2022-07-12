import { useEffect } from 'react';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { useIssuesQuery } from '@query/issue';
import { isAllCheckedState, isCheckedState } from '@store/checkbox';
import { filterBarQueryString } from '@store/filterBar';
import { IssueType } from '@type/issueType';

const useCheckBox = () => {
  const filterBarValue = useRecoilValue(filterBarQueryString);

  const [isCheckedItems, setIsCheckedItems] = useRecoilState(isCheckedState);
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedState);
  const resetCheckedItems = useResetRecoilState(isCheckedState);

  const { data } = useIssuesQuery<IssueType[]>(filterBarValue, (data) => data.issueCoverResponses);

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
      if (data) {
        const ids = data.map((item) => item.issueId);
        setIsCheckedItems(new Set([...ids]));
      }
    }
    setIsAllChecked((prevIsAllChecked) => !prevIsAllChecked);
  };

  useEffect(() => {
    if (data) setIsAllChecked(() => isCheckedItems.size === data.length);
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
