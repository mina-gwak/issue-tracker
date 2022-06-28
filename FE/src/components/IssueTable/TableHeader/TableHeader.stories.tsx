import { ComponentMeta, ComponentStory } from '@storybook/react';

import TableHeader, { TableHeaderPropsType } from '@components/IssueTable/TableHeader';

export default {
  title: 'Component/IssueTable/Header',
  component: TableHeader,
  args: {
    count: [2, 2],
  },
} as ComponentMeta<typeof TableHeader>;

export const Default: ComponentStory<typeof TableHeader> = (args: TableHeaderPropsType) => <TableHeader {...args} />;
