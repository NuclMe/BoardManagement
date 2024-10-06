import React from 'react';
import { Flex, Typography } from 'antd';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardItemTypes, ItemProps } from '../types';

const { Link } = Typography;

const StyledCard = styled(Flex)`
  border: 1px solid #cc8e1e;
  border-radius: 10px;
  padding: 15px;
  background: rgb(246, 245, 242);
  margin-bottom: 15px;
  max-height: 150px;
  height: 100%;
`;

const StyledItemTitle = styled(Link)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Item: React.FC<ItemProps> = ({ cardData }) => {
  if (!cardData) {
    return null;
  }

  return (
    <>
      {cardData.map((issue: CardItemTypes, index: number) => (
        <Draggable
          key={issue.id.toString()}
          draggableId={issue.id.toString()}
          index={index}
        >
          {(provided) => (
            <StyledCard
              vertical
              key={issue.id}
              gap="middle"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <StyledItemTitle href={issue.html_url}>
                {issue.title}
              </StyledItemTitle>
              <Flex>{issue.description}</Flex>
            </StyledCard>
          )}
        </Draggable>
      ))}
    </>
  );
};
