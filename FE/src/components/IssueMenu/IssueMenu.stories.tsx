import { ComponentMeta, ComponentStory } from '@storybook/react';

import IssueMenu from '@components/IssueMenu';

export default {
  title: 'Component/IssueMenu',
  component: IssueMenu,
} as ComponentMeta<typeof IssueMenu>;

export const Default: ComponentStory<typeof IssueMenu> = () => {
  return <IssueMenu />;
};
