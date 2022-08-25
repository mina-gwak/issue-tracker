import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';

import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import * as S from '@components/common/Textarea/Textarea.style';
import { getImageUrl } from '@utils/api/uploadImage';
import { debounce } from '@utils/debounce';
import { getImageName } from '@utils/imageName';

export interface TextareaPropsType {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const Textarea = ({ content, setContent }: TextareaPropsType) => {
  const [letterCount, setLetterCount] = useState(0);

  const isValueExist = content.length > 0;

  const textareaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    debounce(() => setLetterCount(event.target.value.length), 2000)(event);
  };

  const fileChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      const imageUrl = await getImageUrl(event.target.files[0]);
      const imageName = getImageName(event.target.files[0]);

      setContent(
        (prevValue) =>
          prevValue + `${content.at(-1) === '\n' ? '' : '\n'}![${imageName}](${imageUrl})\n`,
      );

      event.target.value = '';
    }
  };

  return (
    <S.Wrapper>
      <S.TextareaBox isValueExist={isValueExist}>
        <S.Textarea value={content} onChange={textareaChangeHandler} />
        <S.TextareaLabel>코멘트를 입력하세요</S.TextareaLabel>
        {letterCount > 0 && <S.LetterCount>띄어쓰기 포함 {letterCount}자</S.LetterCount>}
      </S.TextareaBox>
      <S.FileBox>
        <S.FileInput type='file' id='imageFile' accept='image/png' onChange={fileChangeHandler} />
        <S.FileLabel htmlFor='imageFile'>
          <Icon iconName={ICON_NAME.PAPERCLIP} />
          파일 첨부하기
        </S.FileLabel>
      </S.FileBox>
    </S.Wrapper>
  );
};

export default Textarea;
