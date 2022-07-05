import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueMenu/FilterBar/FilterBar.style';
import Modal from '@components/Modal';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { issues } from '@data/dropdownData';
import { useModal } from '@hooks/useModal';
import { modalState } from '@store/dropdown';
import { filterBarInputValueState } from '@store/filterBar';

const FilterBar = () => {
  const modalValue: { [key: string]: boolean } = useRecoilValue(modalState);
  const filterBarValue = useRecoilValue(filterBarInputValueState);
  const { toggleModal } = useModal();

  return (
    <S.Wrapper>
      <S.FilterButtonWrapper>
        <S.FilterButton onClick={toggleModal('issues')}>
          필터
          <Icon iconName={ICON_NAME.SELECT} />
        </S.FilterButton>
        {modalValue['issues'] && <Modal data={issues} title='이슈' type='is' />}
      </S.FilterButtonWrapper>
      <S.FilterInputWrapper>
        <S.FilterInput
          type='text'
          placeholder='Search all issues'
          value={filterBarValue}
          readOnly
        />
        <Icon iconName={ICON_NAME.SEARCH} />
      </S.FilterInputWrapper>
    </S.Wrapper>
  );
};

export default FilterBar;
