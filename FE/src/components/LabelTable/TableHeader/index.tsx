import React from 'react';

import styled from 'styled-components';

interface TableHeaderPropsType {
  labelCount: number;
}

const TableHeader = ({ labelCount }: TableHeaderPropsType) => {
  return <LabelTableTitle>{labelCount}개의 레이블</LabelTableTitle>;
};

const LabelTableTitle = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.grey6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 16px 16px 0 0;
  padding: 0 32px;
`;

export default TableHeader;
