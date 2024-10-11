import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardItemTypes, ItemProps } from '../types';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteIssueMutation } from '../redux/boardApi';
import { AddItem } from './AddItem';

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

  const handleDeleteIssue = async (boardId: number, taskId: number) => {
    try {
      const response = await deleteIssue({ boardId, taskId }).unwrap();
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
        <Draggable
          key={issue._id}
          draggableId={issue._id.toString()}
          index={index}
        >
          {(provided) => (
            <StyledCard
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {isEditing === index ? (
                <AddItem
                  handleCancelEdit={handleCancelEdit}
                  taskId={issue._id.toString()}
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
                        handleDeleteIssue(issue.boardId, issue._id)
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
