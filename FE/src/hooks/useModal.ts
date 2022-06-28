import { useRecoilState } from 'recoil';

import { modalState } from '@store/atom/dropdown';

interface ReturnUseModalType {
  toggleModal: (type: string) => () => void;
}

export function useModal(): ReturnUseModalType {
  const [modalItem, setModalItem] = useRecoilState(modalState);

  const toggleModal = (type: string) => () => {
    setModalItem({
      issue: false,
      label: false,
      milestone: false,
      author: false,
      assignee: false,
      stateModify: false,
      [type]: !modalItem[type],
    });
  };

  return { toggleModal };
}
