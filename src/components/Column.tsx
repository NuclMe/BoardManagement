import React from 'react';
import { Typography, Col, Flex } from 'antd';
import styled from 'styled-components';
import { Item } from './Item';
import { Droppable } from 'react-beautiful-dnd';
import { ColumnPropsTypes } from '../types';

const StyledColumnInner = styled(Flex)`
  background: #f0f2f5;
  padding: 20px;
  border: 1px solid #cc8e1e;
`;

const StyledTitle = styled(Typography.Title)`
  text-align: center;
`;

export const Column: React.FC<ColumnPropsTypes> = ({
  name,
  cardData,
  droppableId,
}) => {
  return (
    <>
      <Col xs={24} sm={12} md={8}>
        <StyledTitle level={4}>{name}</StyledTitle>
        <StyledColumnInner vertical>
          <Droppable droppableId={droppableId}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Item cardData={cardData} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </StyledColumnInner>
      </Col>
    </>
  );
};
