interface ColumnPropsTypes {
  name: string;
  cardData: Array<CardItemTypes>;
  droppableId: string;
}

interface CardItemTypes {
  boardId: string;
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  boardId: string;
}
interface ItemProps {
  cardData: CardItemTypes[];
}

type TaskStatus = 'Todo' | 'inProgress' | 'Done';

interface AppState {
  Todo: Task[];
  inProgress: Task[];
  Done: Task[];
}

export type {
  ColumnPropsTypes,
  CardItemTypes,
  ItemProps,
  Task,
  TaskStatus,
  AppState,
};
