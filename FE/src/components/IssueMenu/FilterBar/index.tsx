import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueMenu/FilterBar/FilterBar.style';
import Modal from '@components/Modal';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { filter } from '@data/dropdownData';
import { useModal } from '@hooks/useModal';
import { modalState } from '@store/atom/dropdown';

const FilterBar = () => {
  const modalValue: { [key: string]: boolean } = useRecoilValue(modalState);

  const { toggleModal } = useModal();

  return (
    <S.Wrapper>
      <S.FilterButtonWrapper>
        <S.FilterButton onClick={toggleModal('issue')}>
          필터
          <Icon iconName={ICON_NAME.SELECT} />
        </S.FilterButton>
        {modalValue['issue'] && <Modal data={filter} title='이슈' />}
      </S.FilterButtonWrapper>
      <S.FilterInputWrapper>
        <S.FilterInput type='text' placeholder='Search all issues' />
        <Icon iconName={ICON_NAME.SEARCH} />
      </S.FilterInputWrapper>
    </S.Wrapper>
  );
};

export default FilterBar;
