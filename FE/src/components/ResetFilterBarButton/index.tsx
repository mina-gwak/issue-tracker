import { useResetRecoilState } from 'recoil';

import { Images } from '@assets/images';
import * as S from '@components/ResetFilterBarButton/ResetFilterBarButton.style';
import Image from '@components/common/Image';
import { IMAGE_NAME } from '@components/common/Image/constants';
import { filterBarState } from '@store/filterBar';

const ResetFilterBarButton = () => {
  const resetFilterBarValue = useResetRecoilState(filterBarState);
  return (
    <S.ResetButton onClick={resetFilterBarValue}>
      <Image url={Images[IMAGE_NAME.RESET_FILTER_BAR_BUTTON]} alt='reset-button' />
    </S.ResetButton>
  );
};

export default ResetFilterBarButton;
