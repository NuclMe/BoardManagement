import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardItemTypes, ItemProps } from '../types';
import { useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteIssueMutation } from '../redux/boardApi';
import { ChangeItem } from './ChangeItem';
import { removeTask } from '../redux/dataSlice';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cc8e1e;
  border-radius: 10px;
  padding: 15px;
  background: white;
  margin-bottom: 15px;
`;

const StyledItemTitle = styled.div`
  white-space: normal;
  overflow-wrap: break-word;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ItemDescription = styled.div`
  white-space: normal;
  overflow-wrap: break-word;
  margin-top: 10px;
`;

export const Item: React.FC<ItemProps> = ({ cardData }) => {
  const [deleteIssue] = useDeleteIssueMutation();
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleDeleteIssue = async (
    boardId: number,
    taskId: number,
    status: string
  ) => {
    try {
      const response = await deleteIssue({ boardId, taskId }).unwrap();
      dispatch(removeTask({ _id: taskId, status }));
      console.log('Task deleted:', response);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditClick = (index: number) => {
    setIsEditing(index);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  if (!cardData) {
    return null;
  }

  return (
    <>
      {cardData.map((issue: CardItemTypes, index: number) => (
        <Draggable key={issue._id} draggableId={issue._id} index={index}>
          {(provided) => (
            <StyledCard
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {isEditing === index ? (
                <ChangeItem
                  handleCancelEdit={handleCancelEdit}
                  taskId={issue._id}
                  initialTitle={issue.title}
                  initialDescription={issue.description}
                  boardId={issue.boardId.toString()}
                />
              ) : (
                <>
                  <StyledItemTitle>{issue.title}</StyledItemTitle>
                  <ItemDescription>{issue.description}</ItemDescription>
                  <ButtonContainer>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => handleEditClick(index)}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() =>
                        handleDeleteIssue(
                          issue.boardId,
                          issue._id,
                          issue.status
                        )
                      }
                    />
                  </ButtonContainer>
                </>
              )}
            </StyledCard>
          )}
        </Draggable>
      ))}
    </>
  );
};
