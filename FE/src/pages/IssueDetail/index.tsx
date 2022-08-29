import { useEffect } from 'react';

import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import CommentList from '@components/CommentList';
import DetailIssueHeader from '@components/DetailIssueHeader';
import SideBar from '@components/SideBar';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';
import Error from '@pages/Error';
import * as S from '@pages/IssueDetail/IssueDetail.style';
import Loading from '@pages/Loading';
import { deleteIssue } from '@query/issue';
import { queryClient } from '@src';
import { detailIdState, getDetailIssueData } from '@store/detailIssue';

const IssueDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const setDetailIssueId = useSetRecoilState(detailIdState);

  useEffect(() => {
    if (id) setDetailIssueId(Number(id));
  }, [id]);

  const { mutate } = useMutation(deleteIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries('issues', {
        refetchInactive: true,
      });
      navigate('/issue-list');
    },
  });

  const { state, contents } = useRecoilValueLoadable(getDetailIssueData);

  switch (state) {
    case 'hasValue':
      return (
        <S.DetailIssueWrapper>
          <DetailIssueHeader {...contents} />
          <S.DetailMain>
            <CommentList {...contents} />
            <S.DetailOption>
              <SideBar />
              {contents.editable && (
                <S.IssueDeleteButton
                  type='button'
                  onClick={() => contents.issueId && mutate(contents.issueId)}
                >
                  <Icon iconName={ICON_NAME.DELETE_ICON} iconSize={ICON_SIZE.SMALL} />
                  이슈 삭제
                </S.IssueDeleteButton>
              )}
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
