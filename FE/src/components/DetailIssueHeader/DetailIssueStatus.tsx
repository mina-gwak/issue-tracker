import * as S from '@components/DetailIssueHeader/DetailIssueHeader.style';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';

const DetailIssueStatus = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <S.IconContainer>
      {isOpen ? (
        <Icon iconName={ICON_NAME.OPEN_ISSUE} iconSize={ICON_SIZE.LARGE} />
      ) : (
        <Icon iconName={ICON_NAME.CLOSE_ISSUE} iconSize={ICON_SIZE.LARGE} />
      )}
    </S.IconContainer>
  );
};

export default DetailIssueStatus;
