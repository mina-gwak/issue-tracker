import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Images } from '@assets/images';
import * as S from '@components/Header/Header.style';
import Image from '@components/common/Image';
import { IMAGE_NAME, IMAGE_SIZE } from '@components/common/Image/constants';
import { userState } from '@store/user';

const Header = () => {
  const { name, image } = useRecoilValue(userState);
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);

  const toggleLogoutMenu = () => setIsLogoutMenuOpen((prevState) => !prevState);

  return (
    <S.Wrapper>
      <Link to='/issue-list'>
        <h1>
          <Image url={Images[IMAGE_NAME.MEDIUM_LOGO]} alt='logo' />
        </h1>
      </Link>
      <S.LogoutMenuWrapper>
        <S.LogoutMenuButton onClick={toggleLogoutMenu}>
          <Image
            url={image}
            alt={name}
            size={IMAGE_SIZE.MEDIUM}
          />
        </S.LogoutMenuButton>
        {isLogoutMenuOpen && (
          <S.LogoutMenu>
            <S.LogoutMenuItem>
              <S.LogoutButton>Logout</S.LogoutButton>
            </S.LogoutMenuItem>
          </S.LogoutMenu>
        )}
      </S.LogoutMenuWrapper>
    </S.Wrapper>
  );
};

export default Header;
