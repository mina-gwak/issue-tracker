import { ComponentMeta, ComponentStory } from '@storybook/react';

import IssuePopOver, { IssuePopOverPropsType } from '@components/IssueTable/PopOver/IssuePopOver';
import * as S from '@components/IssueTable/PopOver/PopOver.style';

export default {
  title: 'Component/IssueTable/IssuePopOver',
  component: IssuePopOver,
  args: {
    issueId: 2,
  }
} as ComponentMeta<typeof IssuePopOver>;

export const Default: ComponentStory<typeof IssuePopOver> = (args: IssuePopOverPropsType) => {
  const element = document.getElementById('root') as HTMLElement;
  element.style.position = 'relative';

  return (
    <S.StoryWrapper>
      Element
      <IssuePopOver {...args} />
    </S.StoryWrapper>
  );
};
