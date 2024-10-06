import React from 'react';
import { Input, Button, Flex } from 'antd';

export const Header: React.FC = () => {
  return (
    <header>
      <Flex gap="large">
        <Input placeholder="Enter a board ID here..." />
        <Button style={{ width: '200px' }} type="primary" size="middle">
          Load
        </Button>
      </Flex>
    </header>
  );
};
