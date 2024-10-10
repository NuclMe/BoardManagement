import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { Column } from './Column';
import { useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { CardItemTypes } from '../types';
import { RootState } from '../redux/store';

export const Columns: React.FC = () => {
  const todoData = useSelector((state: RootState) => state.todoData.data);
  const inProgressData = useSelector(
    (state: RootState) => state.inProgressData.data
  );
  const doneData = useSelector((state: RootState) => state.doneData.data);

  const [todoList, setTodoList] = useState<CardItemTypes[]>([]);
  const [inProgressList, setInProgressList] = useState<CardItemTypes[]>([]);
  const [doneList, setDoneList] = useState<CardItemTypes[]>([]);

  useEffect(() => {
    // const savedTodo = localStorage.getItem('todoList');
    // const savedInProgress = localStorage.getItem('inProgressList');
    // const savedDone = localStorage.getItem('doneList');

    setTodoList(todoData || []);

    setInProgressList(inProgressData || []);

    setDoneList(doneData || []);
  }, [todoData, inProgressData, doneData]);

  // useEffect(() => {
  //   if (todoList.length > 0)
  //     localStorage.setItem('todoList', JSON.stringify(todoList));
  //   if (inProgressList.length > 0)
  //     localStorage.setItem('inProgressList', JSON.stringify(inProgressList));
  //   if (doneList.length > 0)
  //     localStorage.setItem('doneList', JSON.stringify(doneList));
  // }, [todoList, inProgressList, doneList]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const newList = reorderList(
        source.droppableId,
        source.index,
        destination.index
      );
      updateListByDroppableId(source.droppableId, newList);
    } else {
      const result = moveBetweenLists(source, destination);
      updateListByDroppableId(source.droppableId, result[source.droppableId]);
      updateListByDroppableId(
        destination.droppableId,
        result[destination.droppableId]
      );
    }
  };

  const reorderList = (
    droppableId: string,
    startIndex: number,
    endIndex: number
  ): CardItemTypes[] => {
    const list = [...getListByDroppableId(droppableId)];
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
  };

  const moveBetweenLists = (
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number }
  ) => {
    const sourceList = [...getListByDroppableId(source.droppableId)];
    const destinationList = [...getListByDroppableId(destination.droppableId)];
    const [removed] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removed);

    return {
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    };
  };

  const getListByDroppableId = (droppableId: string): CardItemTypes[] => {
    if (droppableId === 'col-1') return todoList;
    if (droppableId === 'col-2') return inProgressList;
    if (droppableId === 'col-3') return doneList;
    return [];
  };

  const updateListByDroppableId = (
    droppableId: string,
    newList: CardItemTypes[]
  ) => {
    if (droppableId === 'col-1') setTodoList(newList);
    if (droppableId === 'col-2') setInProgressList(newList);
    if (droppableId === 'col-3') setDoneList(newList);
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
