// @ts-nocheck
import React, { useState } from 'react';
import { Row } from 'antd';
import { Column } from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

export const Columns: React.FC = () => {
  const [test] = useState([
    { id: 1, title: 'test', description: 'Lorem ipsum dolorem' },
    { id: 2, title: 'test2', description: 'Lorem ipsum dolorem' },
    { id: 3, title: 'test3', description: 'Lorem ipsum dolorem' },
  ]);

  const [test2] = useState([
    { id: 7, title: 'test', description: 'Lorem ipsum dolorem' },
    { id: 8, title: 'test2', description: 'Lorem ipsum dolorem' },
    { id: 9, title: 'test3', description: 'Lorem ipsum dolorem' },
  ]);
  const [test3] = useState([
    { id: 4, title: 'test', description: 'Lorem ipsum dolorem' },
    { id: 5, title: 'test2', description: 'Lorem ipsum dolorem' },
    { id: 6, title: 'test3', description: 'Lorem ipsum dolorem' },
  ]);

  // const onDragEnd = ({ source, destination }: DropResult) => {
  //   if (!destination) return;

  //   if (source.droppableId === destination.droppableId) {
  //     const newList = reorderList(
  //       source.droppableId,
  //       source.index,
  //       destination.index
  //     );
  //     updateListByDroppableId(source.droppableId, newList);
  //   } else {
  //     const result = moveBetweenLists(source, destination);
  //     updateListByDroppableId(source.droppableId, result[source.droppableId]);
  //     updateListByDroppableId(
  //       destination.droppableId,
  //       result[destination.droppableId]
  //     );
  //   }
  // };

  return (
    <DragDropContext>
      <Row style={{ marginTop: '20px' }} gutter={[20, 20]}>
        <Column name="To Do" cardData={test} droppableId="col-1" />
        <Column name="In Progress" cardData={test2} droppableId="col-2" />
        <Column name="Done" cardData={test3} droppableId="col-3" />
      </Row>
    </DragDropContext>
  );
};
