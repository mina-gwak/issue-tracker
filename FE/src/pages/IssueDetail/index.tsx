import { useEffect } from 'react';

import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import CommentList from '@components/CommentList';
import DetailIssueHeader from '@components/DetailIssueHeader';
import SideBar from '@components/SideBar';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';
import Error from '@pages/Error';
import * as S from '@pages/IssueDetail/IssueDetail.style';
import Loading from '@pages/Loading';
import { useDetailIssueQuery } from '@query/detailIssue';
import { deleteIssue } from '@query/issue';
import { queryClient } from '@src';
import { issueOptionsState } from '@store/issueOptions';

const IssueDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const setIssueOptions = useSetRecoilState(issueOptionsState);
  const resetIssueOptions = useResetRecoilState(issueOptionsState);

  const { data, isLoading, isError } = useDetailIssueQuery(Number(id));

  const { mutate } = useMutation(deleteIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries('issues', {
        refetchInactive: true,
      });
      navigate('/issue-list');
    },
  });

  useEffect(() => {
    if (data) {
      const { assignees, labels, milestoneInformation } = data;
      setIssueOptions({
        assignees: assignees.map(({ optionName }) => optionName),
        labels: labels.map(({ labelName }) => labelName),
        milestone: milestoneInformation?.milestoneName,
      });
    }
  }, [data]);

  useEffect(() => {
    return () => resetIssueOptions();
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      {data && (
        <S.DetailIssueWrapper>
          <DetailIssueHeader {...data} />
          <S.DetailMain>
            <CommentList {...data} />
            <S.DetailOption>
              <SideBar />
              {data.editable && (
                <S.IssueDeleteButton
                  type='button'
                  onClick={() => data.issueId && mutate(data.issueId)}
                >
                  <Icon iconName={ICON_NAME.DELETE_ICON} iconSize={ICON_SIZE.SMALL} />
                  이슈 삭제
                </S.IssueDeleteButton>
              )}
            </S.DetailOption>
          </S.DetailMain>
        </S.DetailIssueWrapper>
      )}
    </>
  );
};

export default IssueDetail;
