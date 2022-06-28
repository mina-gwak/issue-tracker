import { ComponentMeta, ComponentStory } from '@storybook/react';

import Issue from '@components/IssueTable/Issue';
import { issueDummyData } from '@data';
import { IssueType } from '@type/issueType';

export default {
  title: 'Component/IssueTable/Issue',
  component: Issue,
  args: {
    ...issueDummyData[0],
  },
} as ComponentMeta<typeof Issue>;

export const Default: ComponentStory<typeof Issue> = (args: IssueType) => {
  return <Issue {...args} />;
};
