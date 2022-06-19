import FadeLoader from 'react-spinners/FadeLoader';

import * as S from '@pages/Login/Login.style';

const Loading = () => {
  return (
    <S.Wrapper>
      <FadeLoader color='#007aff' height={25} width={6} radius={5} margin={10} />
    </S.Wrapper>
  );
};

export default Loading;
