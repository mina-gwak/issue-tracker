import { ChangeEvent, useState } from 'react';

import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import * as S from '@components/common/Textarea/Textarea.style';
import { debounce } from '@utils/debounce';

const Textarea = () => {
  const [value, setValue] = useState('');
  const [letterCount, setLetterCount] = useState(0);

  const isValueExist = value.length > 0;

  const textareaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    (debounce(() => setLetterCount(event.target.value.length), 2000))(event);
  };

  return (
    <S.Wrapper>
      <S.TextareaBox isValueExist={isValueExist}>
        <S.Textarea onChange={textareaChangeHandler} />
        <S.TextareaLabel>코멘트를 입력하세요</S.TextareaLabel>
        {letterCount > 0 && <S.LetterCount>띄어쓰기 포함 {letterCount}자</S.LetterCount>}
      </S.TextareaBox>
      <S.FileBox>
        <S.FileInput type='file' id='imageFile' />
        <S.FileLabel htmlFor='imageFile'>
          <Icon iconName={ICON_NAME.PAPERCLIP} />
          파일 첨부하기
        </S.FileLabel>
      </S.FileBox>
    </S.Wrapper>
  );
};

export default Textarea;
