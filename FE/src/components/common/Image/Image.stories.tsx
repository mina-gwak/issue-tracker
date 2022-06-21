import { ComponentMeta, ComponentStory } from '@storybook/react';

import Image, { ImagePropsType } from '@components/common/Image';
import { IMAGE_NAME } from '@components/common/Image/constants';

export default {
  title: 'Common/Image',
  component: Image,
  args: {
    imageName: IMAGE_NAME.LARGE_LOGO,
  },
  argTypes: {
    imageName: {
      control: {
        type: 'radio',
      },
      options: [...Object.values(IMAGE_NAME)],
    },
  },
} as ComponentMeta<typeof Image>;

export const Default: ComponentStory<typeof Image> = (args: ImagePropsType) => <Image {...args} />;
