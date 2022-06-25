import { ComponentMeta, ComponentStory } from '@storybook/react';

import TableHeader from '@components/IssueTable/TableHeader';

export default {
  title: 'Component/IssueTable/Header',
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

export const Default: ComponentStory<typeof TableHeader> = () => <TableHeader />;
