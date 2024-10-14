interface ColumnPropsTypes {
  name: string;
  cardData: Array<CardItemTypes>;
  droppableId: string;
}

interface CardItemTypes {
  boardId: number;
  _id: number;
  title: string;
  description: string;
}

interface ItemProps {
  cardData: CardItemTypes[];
}

export type { ColumnPropsTypes, CardItemTypes, ItemProps };
