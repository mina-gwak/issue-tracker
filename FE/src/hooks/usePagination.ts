import { useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { useIssuesQuery } from '@query/issue';
import { filterBarQueryString } from '@store/filterBar';
import { currentPageState, issueTriggerState } from '@store/issue';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [trigger, setTrigger] = useRecoilState(issueTriggerState);
  const filterBarValue = useRecoilValue(filterBarQueryString);
  const { data, hasNextPage, fetchNextPage, isFetching } = useIssuesQuery(filterBarValue);

  const issues = useMemo(
    () => data?.pages[data.pageParams.findIndex((page) => (page || 0) === currentPage)]?.issues,
    [trigger],
  );

  const paginationItems = useMemo(() => {
    const cur = currentPage + 1;
    const total = issues?.totalPages || 0;
    const items: (string | number)[] = [1];

    if (total <= 5) {
      for (let i = 2; i <= total; i++) items.push(i);
      return items;
    }

    if (cur - 1 <= 2) items.push(2, 3);
    else items.push('...', cur <= total - 2 ? cur : total - 2);

    if (total - cur <= 2) items.push(total - 1, total);
    else items.push('...', total);

    return items;
  }, [currentPage, issues?.totalPages]);

  const isPageButtonDisabled = (item: string | number) => typeof item !== 'number';
  const isPageButtonActive = (item: string | number) => currentPage + 1 === item;

  const goToPrevPage = () => {
    if (isFetching) return;
    if (currentPage > 0 && !data?.pageParams.includes(currentPage - 1)) {
      fetchNextPage({ pageParam: currentPage - 1 });
    }
    currentPage !== 0 && setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    if (!issues || isFetching) return;
    if (hasNextPage && !data?.pageParams.includes(currentPage + 1))
      fetchNextPage({ pageParam: currentPage + 1 });
    issues.totalPages !== 0 &&
      currentPage !== issues.totalPages - 1 &&
      setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToSelectedPage = (item: string | number) => () => {
    if (isFetching) return;
    if (typeof item === 'number') {
      if (!data?.pageParams.includes(item - 1)) fetchNextPage({ pageParam: item - 1 });
      setCurrentPage(item - 1);
    }
  };

  useEffect(() => {
    if (isFetching) return;
    setTrigger((prev) => prev + 1);
  }, [isFetching, currentPage]);

  return {
    paginationItems,
    goToPrevPage,
    goToSelectedPage,
    goToNextPage,
    isPageButtonActive,
    isPageButtonDisabled,
  };
};

export default usePagination;
