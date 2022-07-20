import { Link } from 'react-router-dom';

import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';

const IssueAddButton = () => {
  return (
    <Link to='/add-issue'>
      <Button size={BUTTON_SIZE.SMALL} onClick={() => {}}>
        <span> + 이슈 작성</span>
      </Button>
    </Link>
  );
};

export default IssueAddButton;
