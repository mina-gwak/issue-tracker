import { ReactNode } from 'react';

import * as S from '@components/common/Button/Button.style';

interface ButtonPropsType {
  children: ReactNode;
  size: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button = ({ children, size, onClick, disabled = false, outline = false }: ButtonPropsType) => {
  const buttonProps = { size, outline };
  return (
    <S.Button onClick={onClick} disabled={disabled} {...buttonProps}>
      {children}
    </S.Button>
  );
};

export default Button;
