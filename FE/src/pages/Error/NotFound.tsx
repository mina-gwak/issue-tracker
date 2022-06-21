import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import * as S from '@pages/Error/Error.style';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Title>404</S.Title>
      <S.BoldMessage>페이지를 찾을 수 없습니다.</S.BoldMessage>
      <S.Message>경로를 다시 확인해주세요.</S.Message>
      <Button size={BUTTON_SIZE.MEDIUM} onClick={() => navigate('/')}>
        <span>메인으로 가기</span>
      </Button>
    </S.Wrapper>
  );
};

export default NotFound;
