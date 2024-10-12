import React, { useState, useEffect } from 'react';
import { Flex, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAddIssueMutation, useEditIssueMutation } from '../redux/boardApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { TextArea } = Input;

const StyledCard = styled(Flex)`
  border: 1px solid #cc8e1e;
  border-radius: 10px;
  background: white;
  margin-bottom: 15px;
`;

const StyledInputsWrapper = styled(Flex)`
  padding: 15px;
  width: 100%;
`;

interface ChangeItemProps {
  taskId?: string;
  initialTitle?: string;
  initialDescription?: string;
  boardId?: string;
  handleCancelEdit?: () => void;
}

export const ChangeItem: React.FC<ChangeItemProps> = ({
  taskId,
  initialTitle = '',
  initialDescription = '',
  handleCancelEdit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isShown, setIsShown] = useState(false);
  const [isEdit, setIsEdit] = useState(!!taskId);
  const boardId = useSelector((state: RootState) => state.boardId.boardId);

  const [addTask] = useAddIssueMutation();
  const [editTask] = useEditIssueMutation();

  const handleSave = async () => {
    console.log('Saving task:', { title, description, boardId });

    if (title && description && boardId) {
      try {
        if (isEdit && taskId) {
          const result = await editTask({
            taskId,
            title,
            description,
            boardId,
          }).unwrap();
          console.log('Task edited:', result);

          if (handleCancelEdit) {
            handleCancelEdit();
          }
        } else {
          const result = await addTask({
            title,
            description,
            boardId,
            status: 'Todo', // Добавляем статус по умолчанию
          }).unwrap();
          console.log('New task added:', result);

          // Сброс значений
          setTitle('');
          setDescription('');
          setIsShown(false);
          setIsEdit(false);
        }
      } catch (error) {
        console.error('Error saving task:', error);
      }
    } else {
      console.error('Board ID is undefined!');
    }
  };

  useEffect(() => {
    if (taskId || initialTitle || initialDescription) {
      setIsShown(true);
      setIsEdit(!!taskId);
    }
  }, [taskId, initialTitle, initialDescription]);

  const renderContent = () => {
    if (isShown) {
      return (
        <StyledInputsWrapper vertical gap={32}>
          <Input
            showCount
            maxLength={30}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            value={title}
          />
          <TextArea
            rows={4}
            showCount
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            value={description}
            style={{ height: 120, resize: 'none' }}
          />
          <Flex justify="center" gap={10}>
            <Button
              style={{ width: '200px' }}
              size="large"
              onClick={handleSave}
            >
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              style={{ width: '200px' }}
              size="large"
              onClick={isEdit ? handleCancelEdit : () => setIsShown(false)}
            >
              Cancel
            </Button>
          </Flex>
        </StyledInputsWrapper>
      );
    }
    return !isEdit ? (
      <Button
        style={{ margin: '50px' }}
        icon={<PlusOutlined />}
        size="large"
        onClick={() => setIsShown(true)}
      />
    ) : null;
  };

  return <StyledCard justify="center">{renderContent()}</StyledCard>;
};
