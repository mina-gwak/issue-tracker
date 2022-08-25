import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import CommentList from '@components/CommentList';
import DetailIssueHeader from '@components/DetailIssueHeader';
import SideBar from '@components/SideBar';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';
import Error from '@pages/Error';
import * as S from '@pages/IssueDetail/IssueDetail.style';
import Loading from '@pages/Loading';
import { detailIdState, getDetailIssueData } from '@store/detailIssue';

const IssueDetail = () => {
  const { id } = useParams();
  const setDetailIssueId = useSetRecoilState(detailIdState);
  useEffect(() => {
    if (id) setDetailIssueId(Number(id));
  }, []);
  const detailData = useRecoilValueLoadable(getDetailIssueData);
  switch (detailData.state) {
    case 'hasValue':
      return (
        <S.DetailIssueWrapper>
          <DetailIssueHeader detailData={detailData.contents} />
          <S.DetailMain>
            <CommentList
              issueId={detailData.contents.issueId}
              comments={detailData.contents.commentOutlines}
            />
            <S.DetailOption>
              <SideBar />
              <S.DetailDeleteButton>
                <Icon iconName={ICON_NAME.ISSUE_DELETE} iconSize={ICON_SIZE.LARGE} />
              </S.DetailDeleteButton>
            </S.DetailOption>
          </S.DetailMain>
        </S.DetailIssueWrapper>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <Error />;
  }
};

export default IssueDetail;
