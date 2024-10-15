import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { Column } from './Column';
import { useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { RootState } from '../redux/store';
import { useUpdateTaskStatusMutation } from '../redux/boardApi';
import { DeleteBoard } from './DeleteBoard';

interface ColumnsProps {
  isCreated: boolean;
}

export const Columns: React.FC<ColumnsProps> = ({ isCreated }) => {
  const todoData = useSelector((state: RootState) => state.todoData.Todo);
  const inProgressData = useSelector(
    (state: RootState) => state.todoData.inProgress
  );
  const doneData = useSelector((state: RootState) => state.todoData.Done);
  const boardId = useSelector((state: RootState) => state.boardId.boardId);
  const createdBoardId = useSelector(
    (state: RootState) => state.createdBoard.createdBoardId
  );
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [isBoardDeleted, setIsBoardDeleted] = useState(false);

  useEffect(() => {
    if (!isCreated && !isBoardDeleted) {
      setTodoList(todoData || []);
      setInProgressList(inProgressData || []);
      setDoneList(doneData || []);
    } else {
      setTodoList([]);
      setInProgressList([]);
      setDoneList([]);
    }
  }, [todoData, inProgressData, doneData, isCreated, isBoardDeleted]);

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
          <DeleteBoard
            boardId={boardId || createdBoardId}
            onBoardDeleted={handleBoardDeleted}
          />
        </>
      )}
    </>
  );
};
