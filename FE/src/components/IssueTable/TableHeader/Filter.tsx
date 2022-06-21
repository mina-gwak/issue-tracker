import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';

interface FilterPropsType {
  type: string;
  title: string;
}

const Filter = ({ type, title }: FilterPropsType) => {

  // TODO: type 값을 활용한 data fetching

  return (
    <>
      <S.FilterButton>
        {title}
        <Icon iconName={ICON_NAME.SELECT} />
      </S.FilterButton>
      {/* 필터 드롭다운 */}
    </>
  )
}

export default Filter;
