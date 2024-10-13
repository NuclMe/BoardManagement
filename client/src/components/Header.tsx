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
  setCreatedBoardId,
} from '../redux';
import { Input, Button, Flex, Modal } from 'antd';
import { useCreateBoardMutation } from '../redux/boardApi';

interface HeaderProps {
  setIsCreated: (value: boolean) => void; // Пропс для обновления состояния в App
  setHasData: (value: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setIsCreated, setHasData }) => {
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

  const getIssues = async () => {
    try {
      const { data: todoIssues } = await triggerGetTodoIssues(localBoardId);
      const { data: inProgressIssues } =
        await triggerGetGetInProgressIssues(localBoardId);
      const { data: doneIssues } = await triggerGetDoneIssues(localBoardId);

      // Проверяем, есть ли данные для каждой категории и диспатчим пустые массивы, если данных нет
      dispatch(setTodoData(todoIssues ?? []));
      dispatch(setInProgressIssues(inProgressIssues ?? []));
      dispatch(setDoneIssues(doneIssues ?? []));

      if (localBoardId) {
        dispatch(setBoardId(localBoardId));
      }

      // Устанавливаем флаг, что данные получены
      setHasData(true);
    } catch (error) {
      console.error('Error fetching issues:', error);

      // В случае ошибки тоже диспатчим пустые массивы, чтобы не ломалось приложение
      dispatch(setTodoData([]));
      dispatch(setInProgressIssues([]));
      dispatch(setDoneIssues([]));
    }
  };

  const handleCreateBoard = async () => {
    try {
      const response = await createBoard({}).unwrap();
      dispatch(setCreatedBoardId(response._id));

      setIsCreated(true);
      if (response && response._id) {
        setLocalBoardId(response._id);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error creating board:', error);
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
          onClick={handleCreateBoard}
        >
          Create board
        </Button>
      </Flex>
      <Modal
        title="Board Created"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        centered
      >
        <p>Board with ID: {localBoardId} has been created successfully!</p>
      </Modal>
    </header>
  );
};
