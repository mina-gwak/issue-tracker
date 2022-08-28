import { ComponentMeta, ComponentStory } from '@storybook/react';

import AuthorPopOver from '@components/IssueTable/PopOver/AuthorPopOver';
import * as S from '@components/IssueTable/PopOver/PopOver.style';

export default {
  title: 'Component/IssueTable/AuthorPopOver',
  component: AuthorPopOver,
  args: {
    writer: 'Jamie',
    writerImage: 'https://avatars.githubusercontent.com/u/62706988?v=4',
  },
} as ComponentMeta<typeof AuthorPopOver>;

export const Default: ComponentStory<typeof AuthorPopOver> = (args) => {
  const element = document.getElementById('root') as HTMLElement;
  element.style.position = 'relative';

  return (
    <S.StoryWrapper>
      Element
      <AuthorPopOver {...args} />
    </S.StoryWrapper>
  );
};
