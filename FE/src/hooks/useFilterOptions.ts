import axios from 'axios';
import qs from 'qs';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { IconsType } from '@assets/icons';
import { FilterType } from '@components/Modal';
import { ICON_NAME } from '@components/common/Icon/constants';
import { API } from '@constants';
import useCheckBox from '@hooks/useCheckBox';
import { queryClient } from '@src';
import { filterBarArrState, filterBarState, FilterBarStateKeyType } from '@store/filterBar';
import { currentPageState } from '@store/issue';
import { checkBoxClickHandlerType, isCheckedType } from '@type/useOption';

interface CheckedListType {
  id: number[];
  status: string;
}

interface UseDropDownType {
  type: FilterType;
}

const useFilterOptions = ({ type }: UseDropDownType) => {
  const [filterBarValue, setFilterBarValue] = useRecoilState(filterBarState);
  const resetCurrentPage = useResetRecoilState(currentPageState);
  const filterBarArrValue = useRecoilValue(filterBarArrState) as Array<
    [FilterBarStateKeyType & 'stateModify', string[]]
  >;

  const { isCheckedItems, resetCheckedItems } = useCheckBox();

  const isChecked: isCheckedType = (value) => {
    let checkBoxIcon: IconsType = ICON_NAME.CHECKBOX_CIRCLE_INITIAL;

    if (!value) return checkBoxIcon;

    for (const [objKey, objValue] of filterBarArrValue) {
      if (objKey === type) {
        objValue.forEach((item: string) => {
          if (item === value) checkBoxIcon = ICON_NAME.CHECKBOX_CIRCLE_ACTIVE;
        });
      }
    }
    return checkBoxIcon;
  };

  const checkBoxClickHandler: checkBoxClickHandlerType = (value) => () => {
    if (!value) return;

    for (const [objKey, objValue] of filterBarArrValue) {
      if (objKey === type) {
        const checkSameValue = objValue.includes(value);
        if (type === 'is') {
          setFilterBarValue({ ...filterBarValue, [type]: ['issue', value] });
        } else if (type === 'stateModify') {
          fetchStateModify(value);
        } else {
          if (checkSameValue) setFilterBarValue({ ...filterBarValue, [type]: [] });
          else setFilterBarValue({ ...filterBarValue, [type]: [value] });
        }
      }
    }
    resetCurrentPage();
    queryClient.resetQueries('issues');
  };

  const fetchStateModify = async (value: string) => {
    const accessToken = localStorage.getItem('accessToken')!;
    const checkedList = { id: Array.from(isCheckedItems), status: value };

    const myAxios = axios.create({
      paramsSerializer: (checkedList: CheckedListType) =>
        qs.stringify(checkedList, { arrayFormat: 'repeat' }),
    });

    await myAxios.post(`${API.STATUS_UPDATE}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
      params: checkedList,
    });

    queryClient.invalidateQueries('issues');
    resetCheckedItems();
  };

  return { isChecked, checkBoxClickHandler };
};

export default useFilterOptions;
