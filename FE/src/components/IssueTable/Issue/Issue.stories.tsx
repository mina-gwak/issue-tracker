import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Issue from '@components/IssueTable/Issue';
import { issueDummyData } from '@data';
import { IssueListType } from '@type/issueType';

export default {
  title: 'Component/IssueTable/Issue',
  component: Issue,
  args: {
    ...issueDummyData[0],
  },
} as ComponentMeta<typeof Issue>;

export const Default: ComponentStory<typeof Issue> = (args: IssueListType) => {
  return (
    <BrowserRouter>
      <Issue {...args} />
    </BrowserRouter>
  );
};
