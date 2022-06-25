import * as S from '@components/common/Modal/Modal.style';
import { DropdownType } from '@type/dropdownType';

export interface ModalPropsType {
  data: DropdownType[];
  title: string;
  position?: string;
}

const Modal = ({ data, title, position = 'left' }: ModalPropsType) => {
  return (
    <S.MenuList position={position}>
      <S.MenuTitle>{title} 필터</S.MenuTitle>
      {data.map(({ id, optionName }) => (
        <S.MenuOptionGroup key={id}>
          <S.MenuItemOption>{optionName}</S.MenuItemOption>
          <span>체크</span>
        </S.MenuOptionGroup>
      ))}
    </S.MenuList>
  );
};

export default Modal;
