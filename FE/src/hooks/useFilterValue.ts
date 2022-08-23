import { useState } from 'react';

import axios from 'axios';

import { API } from '@constants';
import { stateModify } from '@data/dropdownData';
import { ModalStateType } from '@store/dropdown';
import { DropdownType } from '@type/dropdownType';

interface UseFilterValueType {
  type: ModalStateType;
  title: string;
}

const useFilterValue = ({ type, title }: UseFilterValueType) => {
  const [filterValue, setFilterValue] = useState<DropdownType[]>();

  const fetchFilterValue = async () => {
    if (filterValue) return;
    if (type === 'stateModify') {
      setFilterValue(stateModify);
      return;
    }

    const accessToken = localStorage.getItem('accessToken')!;

    const response = await axios.get(`${API.FILTER(type)}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });

    setFilterValue([
      {
        optionName: `${title}이 없는 이슈`,
        value: 'none',
      },
      ...response.data[`${type}OutlineResponses`],
    ]);
  };

  return {
    filterValue,
    setFilterValue,
    fetchFilterValue,
  };
};

export default useFilterValue;
