import React, { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import { useDeleteBoardMutation } from '../redux/boardApi';

interface DeleteBoardProps {
  boardId: string | null;
  onBoardDeleted: () => void; // Функция для обработки удаления доски
}

export const DeleteBoard: React.FC<DeleteBoardProps> = ({
  boardId,
  onBoardDeleted,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [deleteBoard] = useDeleteBoardMutation();

  const handleDeleteBoard = async () => {
    try {
      await deleteBoard(boardId).unwrap();
      setIsModalVisible(true);
      onBoardDeleted(); // Вызываем функцию, когда доска удалена
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Flex justify="flex-end" style={{ width: '100%' }}>
        <Button color="danger" variant="solid" onClick={handleDeleteBoard}>
          Delete board
        </Button>
      </Flex>
      <Modal
        title="Board Deleted"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        centered
      >
        <p>Board with ID: {boardId} has been deleted successfully!</p>
      </Modal>
    </>
  );
};
