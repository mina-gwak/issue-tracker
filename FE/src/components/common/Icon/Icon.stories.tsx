import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon, { IconPropsType } from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';

export default {
  title: 'Common/Icon',
  component: Icon,
  args: {
    iconName: ICON_NAME.GITHUB,
    iconSize: ICON_SIZE.SMALL,
  },
  argTypes: {
    iconName: {
      control: {
        type: 'radio',
      },
      options: [...Object.values(ICON_NAME)],
    },
    iconSize: {
      control: {
        type: 'radio',
      },
      options: [...Object.values(ICON_SIZE)],
    },
  },
} as ComponentMeta<typeof Icon>;

export const Default: ComponentStory<typeof Icon> = (args: IconPropsType) => <Icon {...args} />;
