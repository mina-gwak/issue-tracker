import { ComponentMeta, ComponentStory } from '@storybook/react';

import Label, { LabelPropsType } from '@components/common/Label';

export default {
  title: 'Common/Label',
  component: Label,
  args: {
    name: 'Document',
    backgroundColor: '#000',
    textColor: '#fff',
  },
} as ComponentMeta<typeof Label>;

export const Default: ComponentStory<typeof Label> = (args: LabelPropsType) => <Label {...args} />;
