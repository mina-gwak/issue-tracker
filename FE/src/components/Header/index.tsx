import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Images } from '@assets/images';
import * as S from '@components/Header/Header.style';
import Image from '@components/common/Image';
import { IMAGE_NAME, IMAGE_SIZE } from '@components/common/Image/constants';

const Header = () => {
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);

  const toggleLogoutMenu = () => setIsLogoutMenuOpen((isLogoutMenuOpen) => !isLogoutMenuOpen);

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
            url='https://avatars.githubusercontent.com/u/93566353?v=4'
            alt='Khan'
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
