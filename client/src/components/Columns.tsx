import React, { useState, useEffect } from 'react';
import { Row, Button } from 'antd';
import { Column } from './Column';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { CardItemTypes } from '../types';
import { RootState } from '../redux/store';
import { setUpdateStatus } from '../redux/updateTaskSlice';
import { useUpdateBoardMutation } from '../redux/boardApi';

export const Columns: React.FC = () => {
  const dispatch = useDispatch();
  const todoData = useSelector((state: RootState) => state.todoData.data);
  const inProgressData = useSelector(
    (state: RootState) => state.inProgressData.data
  );
  const doneData = useSelector((state: RootState) => state.doneData.data);
  const hasChanges = useSelector(
    (state: RootState) => state.updateTaskData.data
  ); // Флаг для изменений
  const boardId = useSelector((state: RootState) => state.boardId.boardId);

  const [todoList, setTodoList] = useState<CardItemTypes[]>([]);
  const [inProgressList, setInProgressList] = useState<CardItemTypes[]>([]);
  const [doneList, setDoneList] = useState<CardItemTypes[]>([]);

  const [updateBoard] = useUpdateBoardMutation(); // Мутация для обновления задач на сервере

  useEffect(() => {
    setTodoList(todoData || []);
    setInProgressList(inProgressData || []);
    setDoneList(doneData || []);
  }, [todoData, inProgressData, doneData]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    // Если таск перемещён в ту же колонку
    if (source.droppableId === destination.droppableId) {
      const newList = reorderList(
        source.droppableId,
        source.index,
        destination.index
      );
      updateListByDroppableId(source.droppableId, newList);
    } else {
      // Если таск перемещён в другую колонку
      const result = moveBetweenLists(source, destination);

      // Копируем таск и обновляем статус
      const task = { ...result[destination.droppableId][destination.index] }; // Создаем копию таска
      let newStatus = '';
      if (destination.droppableId === 'col-1') newStatus = 'Todo';
      if (destination.droppableId === 'col-2') newStatus = 'InProgress';
      if (destination.droppableId === 'col-3') newStatus = 'Done';

      task.status = newStatus; // Обновляем статус задачи в копии

      // Обновляем списки с новой задачей
      result[destination.droppableId][destination.index] = task; // Вставляем обновленный таск обратно в массив

      updateListByDroppableId(source.droppableId, result[source.droppableId]);
      updateListByDroppableId(
        destination.droppableId,
        result[destination.droppableId]
      );

      // Устанавливаем флаг изменений
      dispatch(setUpdateStatus(true));
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

  const handleUpdate = async () => {
    const allTasks = [...todoList, ...inProgressList, ...doneList]; // Собираем все задачи в один массив

    try {
      // Отправляем данные на сервер с помощью мутации
      console.log(allTasks);
      await updateBoard({ tasks: allTasks, boardId });
      dispatch(setUpdateStatus(false)); // Сбрасываем флаг изменений после успешного обновления
    } catch (error) {
      console.error('Ошибка при обновлении задач:', error);
    }
  };

  return (
    <>
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
      {hasChanges && (
        <Button
          type="primary"
          onClick={handleUpdate}
          style={{ marginTop: '20px' }}
        >
          Update
        </Button>
      )}
    </>
  );
};
