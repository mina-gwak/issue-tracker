import ReactMarkdown from 'react-markdown';

import * as S from '@components/common/MarkDown/MarkDown.style';

interface MarkDownPropsTypes {
  children: string;
}

const MarkDown = ({ children }: MarkDownPropsTypes) => {
  return (
    <S.MarkDownStyle>
      <ReactMarkdown>{children}</ReactMarkdown>
    </S.MarkDownStyle>
  );
};

export default MarkDown;
