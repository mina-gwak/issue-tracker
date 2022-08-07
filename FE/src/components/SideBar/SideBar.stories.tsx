import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideBar from '@components/SideBar';

export default {
  title: 'Component/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

export const Default: ComponentStory<typeof SideBar> = () => <SideBar />;
