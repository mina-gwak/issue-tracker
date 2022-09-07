import { useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { useIssuesQuery } from '@query/issue';
import { filterBarQueryString } from '@store/filterBar';
import { currentPageState, issueTriggerState } from '@store/issue';

const useIssues = () => {
  const currentPage = useRecoilValue(currentPageState);
  const [trigger] = useRecoilState(issueTriggerState);
  const filterBarValue = useRecoilValue(filterBarQueryString);
  const { data } = useIssuesQuery(filterBarValue);

  return useMemo(() => data?.pages[data.pageParams.findIndex(page => (page || 0) === currentPage)]?.issues, [trigger]);
};

export default useIssues;
