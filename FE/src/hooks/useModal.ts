import { RefObject } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { modalState, ModalStateType } from '@store/dropdown';

interface UseModalPropsType<T> {
  modalRef: RefObject<T>;
  type: ModalStateType;
}

interface UseModalReturnType {
  toggleModal: () => void;
  handleModalClick: (event: MouseEvent) => void;
}

export const useModal = <T extends HTMLElement>({
  modalRef,
  type,
}: UseModalPropsType<T>): UseModalReturnType => {
  const [modalItem, setModalItem] = useRecoilState(modalState);
  const resetModalValue = useResetRecoilState(modalState);

  const toggleModal = () => {
    setModalItem({
      ...modalItem,
      [type]: !modalItem[type],
    });
  };

  const handleModalClick = (event: MouseEvent) => {
    if (!modalRef.current?.contains(event.target as Node)) resetModalValue();
  };

  return { toggleModal, handleModalClick };
};
