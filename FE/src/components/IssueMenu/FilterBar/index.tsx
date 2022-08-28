import { useRef } from 'react';

import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueMenu/FilterBar/FilterBar.style';
import Modal from '@components/Modal';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { issues } from '@data/dropdownData';
import useFilterOptions from '@hooks/useFilterOptions';
import useModal from '@hooks/useModal';
import { filterBarInputValueState } from '@store/filterBar';

const FilterBar = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const filterBarValue = useRecoilValue(filterBarInputValueState);
  const [isModalOpen, toggleModal] = useModal({ modalRef });
  const { isChecked, checkBoxClickHandler } = useFilterOptions({ type: 'is' });

  return (
    <S.Wrapper>
      <S.FilterButtonWrapper>
        <S.FilterButton onClick={toggleModal}>
          필터
          <Icon iconName={ICON_NAME.SELECT} />
        </S.FilterButton>
        {isModalOpen && (
          <Modal
            modalRef={modalRef}
            data={issues}
            title='이슈 필터'
            isChecked={isChecked}
            checkBoxClickHandler={checkBoxClickHandler}
          />
        )}
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
