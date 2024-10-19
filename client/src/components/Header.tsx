import React, { useState } from 'react';
import {
  useLazyGetTodoIssuesQuery,
  useLazyGetInProgressIssuesQuery,
  useLazyGetDoneIssuesQuery,
} from '../redux/boardApi';
import { useDispatch } from 'react-redux';
import { setAppData, setBoardId } from '../redux';
import { Input, Button, Flex, Modal } from 'antd';
import { useCreateBoardMutation } from '../redux/boardApi';

interface HeaderProps {
  setHasData: (value: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setHasData }) => {
  const [localBoardId, setLocalBoardId] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [createBoard] = useCreateBoardMutation();

  const [triggerGetTodoIssues] = useLazyGetTodoIssuesQuery();
  const [triggerGetGetInProgressIssues] = useLazyGetInProgressIssuesQuery();
  const [triggerGetDoneIssues] = useLazyGetDoneIssuesQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalBoardId(e.target.value);
  };
  const handleCreateBoard = async () => {
    try {
      const response = await createBoard({}).unwrap();
      if (response && response._id) {
        const newBoardId = response._id;

        dispatch(setBoardId(newBoardId));
        setLocalBoardId(newBoardId);

        await getIssues(newBoardId);
      }
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const getIssues = async (boardId: string) => {
    if (!boardId) {
      console.error('Board ID is undefined!');
      return;
    }

    try {
      const { data: todoIssues } = await triggerGetTodoIssues(boardId);
      const { data: inProgressIssues } =
        await triggerGetGetInProgressIssues(boardId);
      const { data: doneIssues } = await triggerGetDoneIssues(boardId);

      dispatch(
        setAppData({
          Todo: todoIssues ?? [],
          inProgress: inProgressIssues ?? [],
          Done: doneIssues ?? [],
        })
      );

      dispatch(setBoardId(boardId));
      setHasData(true);
    } catch (error) {
      console.error('Error fetching issues:', error);

      dispatch(
        setAppData({
          Todo: [],
          inProgress: [],
          Done: [],
        })
      );
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
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
          onClick={() => {
            if (localBoardId) {
              getIssues(localBoardId);
            } else {
              console.error('Board ID is undefined!');
            }
          }}
        >
          Load board
        </Button>
        <Button
          style={{ width: '200px' }}
          type="primary"
          size="middle"
          color="default"
          variant="solid"
          onClick={handleCreateBoard}
        >
          Create board
        </Button>
      </Flex>
      <Modal
        title="Board Created"
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        centered
      >
        <p>Board with ID: {localBoardId} has been created successfully!</p>
      </Modal>
    </header>
  );
};
