import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@components/common/Label/Label.style';
import { filterBarArrState, filterBarState } from '@store/filterBar';

export interface LabelPropsType {
  labelName: string;
  labelColor: string;
  textColor: string;
}

const Label = ({ labelName, labelColor, textColor }: LabelPropsType) => {
  const filterBarArrValue = useRecoilValue(filterBarArrState);
  const [filterBarValue, setFilterBarValue] = useRecoilState(filterBarState);

  const labelClickHandler = (type: string, value: string) => () => {
    for (const [, objValue] of filterBarArrValue) {
      if (Array.isArray(objValue)) {
        const checkSameValue = objValue.includes(value);
        if (checkSameValue) return;
        if (!checkSameValue) {
          setFilterBarValue({ ...filterBarValue, [type]: [value] });
        }
      }
    }
  };

  return (
    <S.LabelTag
      backgroundColor={labelColor}
      textColor={textColor}
      onClick={labelClickHandler('labels', labelName)}
    >
      {labelName}
    </S.LabelTag>
  );
};

export default Label;
