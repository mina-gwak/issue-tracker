import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { issueItem } from '@components/IssueTable';
import Issue from '@components/IssueTable/Issue';
import { IssueListType } from '@type/issueType';

export default {
  title: 'Component/IssueTable/Issue',
  component: Issue,
  args: {
    ...issueItem[0],
  },
} as ComponentMeta<typeof Issue>;

export const Default: ComponentStory<typeof Issue> = (args: IssueListType) => {
  return (
    <BrowserRouter>
      <Issue {...args} />
    </BrowserRouter>
  );
};
