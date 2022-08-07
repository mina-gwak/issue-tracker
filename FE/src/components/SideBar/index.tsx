import * as S from '@components/SideBar/SideBar.style';
import SideBarSection from '@components/SideBar/SideBarSection';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Label from '@components/common/Label';
import { labels, milestones, users } from '@data';

const SideBar = () => {
  // TODO: 구조 개선 필요
  return (
    <S.Wrapper>
      <SideBarSection title='담당자'>
        {users && (
          <S.List>
            {users.map(({ userName, userImage }) => (
              <S.ListItem key={userName}>
                <Image url={userImage} alt={userName} size={IMAGE_SIZE.MEDIUM} />
                <S.Text>{userName}</S.Text>
              </S.ListItem>
            ))}
          </S.List>
        )}
      </SideBarSection>
      <SideBarSection title='레이블'>
        {labels && (
          <S.List>
            {labels.map(({ labelName, labelColor, textColor }) => (
              <S.ListItem key={labelName}>
                <Label labelName={labelName} labelColor={labelColor} textColor={textColor} />
              </S.ListItem>
            ))}
          </S.List>
        )}
      </SideBarSection>
      <SideBarSection title='마일스톤'>
        {milestones && (
          <S.List>
            {milestones.map(({ name, ratio }) => (
              <S.ListItem key={name}>
                <S.Text>{name}</S.Text>
                <S.Text>{ratio}</S.Text>
              </S.ListItem>
            ))}
          </S.List>
        )}
      </SideBarSection>
    </S.Wrapper>
  );
};

export default SideBar;
