import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { Column } from './Column';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { RootState } from '../redux/store';
import { useUpdateTaskStatusMutation } from '../redux/boardApi';
import { DeleteBoard } from './DeleteBoard';
import { moveTask } from '../redux/appDataSlice';
import { Task, TaskStatus } from '../types';

export const Columns: React.FC = () => {
  const todoData = useSelector((state: RootState) => state.appData.Todo);
  const inProgressData = useSelector(
    (state: RootState) => state.appData.inProgress
  );
  const doneData = useSelector((state: RootState) => state.appData.Done);
  const boardId = useSelector((state: RootState) => state.boardId.boardId);

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const dispatch = useDispatch();

  const [todoList, setTodoList] = useState<Task[]>([]);
  const [inProgressList, setInProgressList] = useState<Task[]>([]);
  const [doneList, setDoneList] = useState<Task[]>([]);
  const [isBoardDeleted, setIsBoardDeleted] = useState(false);

  useEffect(() => {
    if (!isBoardDeleted) {
      setTodoList(todoData || []);
      setInProgressList(inProgressData || []);
      setDoneList(doneData || []);
    } else {
      setTodoList([]);
      setInProgressList([]);
      setDoneList([]);
    }
  }, [todoData, inProgressData, doneData, isBoardDeleted]);

  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (!destination) return;

    const taskMoved = getListByDroppableId(source.droppableId)[source.index];

    if (!taskMoved || !taskMoved._id) {
      console.error('Task ID is undefined!');
      return;
    }

    let newStatus: TaskStatus | undefined;

    if (destination.droppableId === 'col-1') newStatus = 'Todo';
    if (destination.droppableId === 'col-2') newStatus = 'inProgress';
    if (destination.droppableId === 'col-3') newStatus = 'Done';

    if (source.droppableId !== destination.droppableId && newStatus) {
      try {
        await updateTaskStatus({
          boardId: boardId,
          taskId: taskMoved._id,
          status: newStatus,
        });

        dispatch(
          moveTask({
            _id: taskMoved._id,
            status: newStatus,
          })
        );
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const getListByDroppableId = (droppableId: string) => {
    if (droppableId === 'col-1') return todoList;
    if (droppableId === 'col-2') return inProgressList;
    if (droppableId === 'col-3') return doneList;
    return [];
  };

  const handleBoardDeleted = () => {
    setIsBoardDeleted(true);
  };

  return (
    <>
      {!isBoardDeleted && (
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
          <DeleteBoard boardId={boardId} onBoardDeleted={handleBoardDeleted} />
        </>
      )}
    </>
  );
};
