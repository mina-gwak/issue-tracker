import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextInput from '@components/common/TextInput';
import { INPUT_SIZE, INPUT_STATUS } from '@components/common/TextInput/constants';

export default {
  title: 'Common/TextInput',
  component: TextInput,
  args: {
    size: INPUT_SIZE.SMALL,
    name: 'id',
    placeholder: '아이디',
    isValueExist: false,
    disabled: false,
    status: INPUT_STATUS.NORMAL,
    message: '사용 가능한 아이디입니다!'
  },
} as ComponentMeta<typeof TextInput>;

export const Default: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;
