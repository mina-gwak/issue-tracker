import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import * as S from '@components/common/Pagination/Pagination.style';
import usePagination from '@hooks/usePagination';

const Pagination = () => {
  const { paginationItems, goToPrevPage, goToSelectedPage, goToNextPage, isPageButtonDisabled, isPageButtonActive } = usePagination();

  return (
    <S.PaginationContainer>
      <S.PageChangeButton onClick={goToPrevPage}>
        <Icon iconName={ICON_NAME.PREVIOUS} />
      </S.PageChangeButton>
      {paginationItems.map((item, idx) => (
        <S.PageButton
          disabled={isPageButtonDisabled(item)}
          key={`${idx}${item}`}
          onClick={goToSelectedPage(item)}
          isActive={isPageButtonActive(item)}
        >
          {item}
        </S.PageButton>
      ))}
      <S.PageChangeButton onClick={goToNextPage}>
        <Icon iconName={ICON_NAME.NEXT} />
      </S.PageChangeButton>
    </S.PaginationContainer>
  );
};

export default Pagination;
