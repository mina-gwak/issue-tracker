import { ComponentMeta, ComponentStory } from '@storybook/react';

import IssueTable from '@components/IssueTable';

export default {
  title: 'Component/IssueTable',
  component: IssueTable,
} as ComponentMeta<typeof IssueTable>;

export const Default: ComponentStory<typeof IssueTable> = () => {
  return <IssueTable />;
};
