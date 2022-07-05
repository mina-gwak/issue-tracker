import { ComponentMeta, ComponentStory } from '@storybook/react';

import Modal, { ModalPropsType } from '@components/Modal/index';
import { issues } from '@data/dropdownData';

export default {
  title: 'Common/Modal',
  component: Modal,
  args: {
    data: issues,
    title: '이슈',
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args: ModalPropsType) => <Modal {...args} />;
