import { ComponentMeta, ComponentStory } from '@storybook/react';

import PopOver, { PopOverPropsType } from '@components/common/PopOver';
import * as S from '@components/common/PopOver/PopOver.style';

export default {
  title: 'Common/PopOver',
  component: PopOver,
} as ComponentMeta<typeof PopOver>;

export const Default: ComponentStory<typeof PopOver> = (args: PopOverPropsType) => {
  const element = document.getElementById('root') as HTMLElement;
  element.style.position = 'relative';

  return (
    <S.StoryWrapper>
      Element
      <PopOver {...args} />
    </S.StoryWrapper>
  );
};
