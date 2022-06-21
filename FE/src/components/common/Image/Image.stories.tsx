import { ComponentMeta, ComponentStory } from '@storybook/react';

import Image, { ImagePropsType } from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';

export default {
  title: 'Common/Image',
  component: Image,
  args: {
    url: 'https://avatars.githubusercontent.com/u/62706988?v=4',
    alt: 'Profile',
  },
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: [...Object.values(IMAGE_SIZE)],
    },
  },
} as ComponentMeta<typeof Image>;

export const Default: ComponentStory<typeof Image> = (args: ImagePropsType) => <Image {...args} />;
