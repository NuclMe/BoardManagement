import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { Column } from './Column';
import { useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { CardItemTypes } from '../types';
import { RootState } from '../redux/store';
import { useUpdateTaskStatusMutation } from '../redux/boardApi';

export const Columns: React.FC = () => {
  const todoData = useSelector((state: RootState) => state.todoData.data);
  const inProgressData = useSelector(
    (state: RootState) => state.inProgressData.data
  );
  const doneData = useSelector((state: RootState) => state.doneData.data);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const boardId = useSelector((state: RootState) => state.boardId.boardId);

  const [todoList, setTodoList] = useState<CardItemTypes[]>([]);
  const [inProgressList, setInProgressList] = useState<CardItemTypes[]>([]);
  const [doneList, setDoneList] = useState<CardItemTypes[]>([]);

  useEffect(() => {
    setTodoList(todoData || []);

    setInProgressList(inProgressData || []);

    setDoneList(doneData || []);
  }, [todoData, inProgressData, doneData]);

  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (!destination) return;

    const taskMoved = getListByDroppableId(source.droppableId)[source.index];
    let newStatus;

    if (destination.droppableId === 'col-1') newStatus = 'Todo';
    if (destination.droppableId === 'col-2') newStatus = 'InProgress';
    if (destination.droppableId === 'col-3') newStatus = 'Done';

    if (source.droppableId !== destination.droppableId && taskMoved) {
      try {
        await updateTaskStatus({
          boardId: boardId,
          taskId: taskMoved._id,
          status: newStatus,
        });
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const getListByDroppableId = (droppableId: string): CardItemTypes[] => {
    if (droppableId === 'col-1') return todoList;
    if (droppableId === 'col-2') return inProgressList;
    if (droppableId === 'col-3') return doneList;
    return [];
  };

  if (!todoList.length && !inProgressList.length && !doneList.length) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row style={{ marginTop: '20px' }} gutter={[20, 20]}>
        <Column name="To Do" cardData={todoList} droppableId="col-1" />
        <Column
          name="In Progress"
          cardData={inProgressList}
          droppableId="col-2"
        />
        <Column name="Done" cardData={doneList} droppableId="col-3" />
      </Row>
    </DragDropContext>
  );
};
