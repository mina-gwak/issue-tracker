import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import CheckBox, { CheckBoxPropsType } from '@components/common/CheckBox';

export default {
  title: 'Common/CheckBox',
  component: CheckBox,
  args: {
    isAllChecked: true,
  },
  argTypes: {
    isChecked: {
      type: 'boolean',
    },
    isAllChecked: {
      type: 'boolean',
    },
  },
} as ComponentMeta<typeof CheckBox>;

export const Default: ComponentStory<typeof CheckBox> = (args: CheckBoxPropsType) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleIsChecked = () => setIsChecked((prevState) => !prevState);

  return <CheckBox {...args} isChecked={isChecked} toggleIsChecked={toggleIsChecked} />;
};
