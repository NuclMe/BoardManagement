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

interface AddItemProps {
  taskId?: string;
  initialTitle?: string;
  initialDescription?: string;
  boardId: string;
}

export const AddItem: React.FC<AddItemProps> = ({
  taskId,
  initialTitle = '',
  initialDescription = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isShown, setIsShown] = useState(false);
  const boardId = useSelector((state: RootState) => state.boardId);

  // Mutations for adding and editing tasks
  const [addTask] = useAddIssueMutation();
  const [editTask] = useEditIssueMutation();

  // If there's a taskId, we are in "edit mode"
  const handleSave = async () => {
    if (title && description) {
      try {
        if (taskId) {
          // Edit task
          await editTask({ taskId, title, description, boardId }).unwrap();
        } else {
          // Add new task
          await addTask({ title, description, boardId }).unwrap();
        }
        // Clear inputs after success
        setTitle('');
        setDescription('');
        setIsShown(false);
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };
  const handleAddProduct = async () => {
    if (title && description && boardId) {
      try {
        // Call the mutation with title, description, and boardId
        await addTask({ title, description, boardId }).unwrap();
        setTitle('');
        setDescription('');
        setIsShown(false);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Show form if editing or adding a new task
  useEffect(() => {
    if (initialTitle || initialDescription) {
      setIsShown(true);
    }
  }, [initialTitle, initialDescription]);

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
              onClick={handleAddProduct}
            >
              {taskId ? 'Update' : 'Save'}
            </Button>
            <Button
              style={{ width: '200px' }}
              size="large"
              onClick={() => setIsShown(false)}
            >
              Cancel
            </Button>
          </Flex>
        </StyledInputsWrapper>
      );
    }
    return (
      <Button
        style={{ margin: '50px' }}
        icon={<PlusOutlined />}
        size="large"
        onClick={() => setIsShown(true)}
      />
    );
  };

  return <StyledCard justify="center">{renderContent()}</StyledCard>;
};
