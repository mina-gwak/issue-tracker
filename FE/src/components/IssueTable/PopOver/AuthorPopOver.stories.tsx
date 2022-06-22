import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import AuthorPopOver from '@components/IssueTable/PopOver/AuthorPopOver';
import * as S from '@components/common/PopOver/PopOver.style';

export default {
  title: 'Component/IssueTable/AuthorPopOver',
  component: AuthorPopOver,
} as ComponentMeta<typeof AuthorPopOver>;

export const Default: ComponentStory<typeof AuthorPopOver> = () => {
  const element = document.getElementById('root') as HTMLElement;
  element.style.position = 'relative';

  return (
    <BrowserRouter>
      <S.StoryWrapper>
        Element
        <AuthorPopOver />
      </S.StoryWrapper>
    </BrowserRouter>
  );
};
