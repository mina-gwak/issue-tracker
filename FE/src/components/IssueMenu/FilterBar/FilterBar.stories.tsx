import { ComponentMeta, ComponentStory } from '@storybook/react';

import FilterBar from '@components/IssueMenu/FilterBar/index';

export default {
  title: 'Component/IssueMenu/FilterBar',
  component: FilterBar,
} as ComponentMeta<typeof FilterBar>;

export const Default: ComponentStory<typeof FilterBar> = () => <FilterBar />;
