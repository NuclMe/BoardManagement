import React, { useState } from 'react';
import {
  useLazyGetTodoIssuesQuery,
  useLazyGetInProgressIssuesQuery,
  useLazyGetDoneIssuesQuery,
} from '../redux/boardApi';
import { useDispatch } from 'react-redux';
import {
  setTodoData,
  setInProgressIssues,
  setDoneIssues,
  setBoardId,
} from '../redux';
import { Input, Button, Flex } from 'antd';

export const Header: React.FC = () => {
  const [localBoardId, setLocalBoardId] = useState<string>();
  const dispatch = useDispatch();

  const [triggerGetTodoIssues] = useLazyGetTodoIssuesQuery();
  const [triggerGetGetInProgressIssues] = useLazyGetInProgressIssuesQuery();
  const [triggerGetDoneIssues] = useLazyGetDoneIssuesQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalBoardId(e.target.value);
  };
  const getIssues = async () => {
    const { data } = await triggerGetTodoIssues(localBoardId);
    const { data: inProgressIssues } =
      await triggerGetGetInProgressIssues(localBoardId);
    const { data: doneIssues } = await triggerGetDoneIssues(localBoardId);

    if (data && inProgressIssues && doneIssues && localBoardId) {
      dispatch(setTodoData(data));
      dispatch(setInProgressIssues(inProgressIssues));
      dispatch(setDoneIssues(doneIssues));
      dispatch(setBoardId(localBoardId));
    }
  };
  return (
    <header>
      <Flex gap="large">
        <Input
          placeholder="Enter a board ID here..."
          onChange={handleInputChange}
        />
        <Button
          style={{ width: '200px' }}
          type="primary"
          size="middle"
          onClick={getIssues}
        >
          Load
        </Button>
        <Button
          style={{ width: '200px' }}
          type="primary"
          size="middle"
          color="default"
          variant="solid"
        >
          Create board
        </Button>
      </Flex>
    </header>
  );
};
