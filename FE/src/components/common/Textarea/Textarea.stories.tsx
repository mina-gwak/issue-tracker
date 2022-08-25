import { ComponentMeta, ComponentStory } from '@storybook/react';

import Textarea, { TextareaPropsType } from '@components/common/Textarea';

export default {
  title: 'Common/Textarea',
  component: Textarea,
  args: {
    comment: '',
    setComment: () => {},
  },
} as ComponentMeta<typeof Textarea>;

export const Default: ComponentStory<typeof Textarea> = (args: TextareaPropsType) => (
  <Textarea {...args} />
);
