import * as S from '@components/common/Button/Button.style';

interface ButtonPropsType {
  content: string;
  size: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button = ({ content, size, onClick, disabled = false, outline = false }: ButtonPropsType) => {
  const buttonProps = { size, outline };
  return (
    <S.Button onClick={onClick} disabled={disabled} {...buttonProps}>
      <span>{content}</span>
    </S.Button>
  );
};

export default Button;
