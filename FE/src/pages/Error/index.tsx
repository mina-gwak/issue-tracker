import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import * as S from '@pages/Error/Error.style';

interface LocationStateType {
  message: string;
}

const Error = () => {
  const { state } = useLocation();
  const message = (state as LocationStateType)?.message;

  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Title>Oops!</S.Title>
      <S.BoldMessage>{ message }</S.BoldMessage>
      <S.Message>잠시 후에 다시 시도해주세요.</S.Message>
      <Button size={BUTTON_SIZE.MEDIUM} content={'처음으로 돌아가기'} onClick={() => navigate('/')} />
    </S.Wrapper>
  );
};

export default Error;
