import { ComponentMeta, ComponentStory } from '@storybook/react';

import AuthorPopOver from '@components/IssueTable/PopOver/AuthorPopOver';
import * as S from '@components/IssueTable/PopOver/PopOver.style';

export default {
  title: 'Component/IssueTable/AuthorPopOver',
  component: AuthorPopOver,
} as ComponentMeta<typeof AuthorPopOver>;

export const Default: ComponentStory<typeof AuthorPopOver> = () => {
  const element = document.getElementById('root') as HTMLElement;
  element.style.position = 'relative';

  return (
      <S.StoryWrapper>
        Element
        <AuthorPopOver />
      </S.StoryWrapper>
  );
};
