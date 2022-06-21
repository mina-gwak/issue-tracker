import * as S from '@components/common/PopOver/PopOver.style';

export interface PopOverPropsType {
  children?: JSX.Element;
}

const PopOver = ({ children }: PopOverPropsType) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default PopOver;
