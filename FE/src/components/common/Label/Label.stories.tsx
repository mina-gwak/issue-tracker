import { ComponentMeta, ComponentStory } from '@storybook/react';

import Label, { LabelPropsType } from '@components/common/Label';

export default {
  title: 'Common/Label',
  component: Label,
  args: {
    labelName: 'Document',
    labelColor: '#000000',
    textColor: '#ffffff',
  },
} as ComponentMeta<typeof Label>;

export const Default: ComponentStory<typeof Label> = (args: LabelPropsType) => <Label {...args} />;
