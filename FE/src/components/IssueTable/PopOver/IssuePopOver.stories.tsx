import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import IssuePopOver from '@components/IssueTable/PopOver/IssuePopOver';
import * as S from '@components/common/PopOver/PopOver.style';
import { issueDummyData } from '@data';
import { IssueListType } from '@type/issueType';

export default {
  title: 'Component/IssueTable/IssuePopOver',
  component: IssuePopOver,
  args: {
    ...issueDummyData[1],
  }
} as ComponentMeta<typeof IssuePopOver>;

export const Default: ComponentStory<typeof IssuePopOver> = (args: IssueListType) => {
  const element = document.getElementById('root') as HTMLElement;
  element.style.position = 'relative';

  return (
    <BrowserRouter>
      <S.StoryWrapper>
        Element
        <IssuePopOver {...args} />
      </S.StoryWrapper>
    </BrowserRouter>
  );
};
