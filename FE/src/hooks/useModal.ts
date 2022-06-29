import { useRecoilState } from 'recoil';

import { defaultState, modalState, ModalStateType } from '@store/dropdown';

interface ReturnUseModalType {
  toggleModal: (type: ModalStateType) => () => void;
}

export function useModal(): ReturnUseModalType {
  const [modalItem, setModalItem] = useRecoilState(modalState);

  const toggleModal = (type: ModalStateType) => () => {
    setModalItem({
      ...defaultState,
      [type]: !modalItem[type],
    });
  };

  return { toggleModal };
}
