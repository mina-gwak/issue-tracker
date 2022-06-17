import * as S from '@components/common/Button/Button.style';

interface ButtonPropsType {
  content: string;
  disabled: boolean;
  size: string;
  outline: boolean;
  onClick: () => void;
}

const Button = ({ onClick, disabled, size, outline, content }: ButtonPropsType) => {
  const buttonProps = { size, outline };
  return (
    <S.Button onClick={onClick} disabled={disabled} {...buttonProps}>
      <span>{content}</span>
    </S.Button>
  );
};

export default Button;
