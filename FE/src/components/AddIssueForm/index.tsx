import { useState, MouseEvent, useEffect } from 'react';

import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import SideBar from '@components/SideBar';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import TextInput from '@components/common/TextInput';
import { INPUT_SIZE } from '@components/common/TextInput/constants';
import Textarea from '@components/common/Textarea';
import * as S from '@pages/AddIssue/AddIssue.style';
import { addIssue } from '@query/issue';
import { queryClient } from '@src';
import { issueOptionsState } from '@store/issueOptions';
import { userState } from '@store/user';
import { AddIssueDataType } from '@type/issueType';

const AddIssueForm = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const { name, image } = useRecoilValue(userState);
  const { assignees, labels, milestone } = useRecoilValue(issueOptionsState);
  const resetIssueOptions = useResetRecoilState(issueOptionsState);

  const navigate = useNavigate();
  const { mutate } = useMutation(addIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries('issues');
      navigate('/issue-list');
    }
  });

  const isSubmitDisabled = !title || !content;

  const submitIssueForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const issue: AddIssueDataType = { title, content };
    if (assignees.length) issue.assignees = assignees;
    if (labels.length) issue.labels = labels;
    if (milestone) issue.milestone = milestone;
    mutate(issue);
  };

  useEffect(() => {
    return () => resetIssueOptions();
  }, []);

  return (
    <S.Form>
      <S.FormContainer>
        <S.FormWrapper>
          <Image url={image} alt={name} size={IMAGE_SIZE.MEDIUM} />
          <S.FormElements>
            <TextInput
              size={INPUT_SIZE.MEDIUM}
              name='title'
              placeholder='제목'
              value={title}
              setValue={setTitle}
            />
            <Textarea content={content} setContent={setContent} />
          </S.FormElements>
        </S.FormWrapper>
        <SideBar />
      </S.FormContainer>
      <S.Divider />
      <Button size={BUTTON_SIZE.MEDIUM} onClick={submitIssueForm} disabled={isSubmitDisabled}>
        완료
      </Button>
    </S.Form>
  );
};

export default AddIssueForm;
