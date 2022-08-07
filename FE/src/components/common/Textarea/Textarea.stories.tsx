import { ComponentMeta, ComponentStory } from '@storybook/react';

import Textarea from '@components/common/Textarea';

export default {
  title: 'Common/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

export const Default: ComponentStory<typeof Textarea> = () => <Textarea />;
