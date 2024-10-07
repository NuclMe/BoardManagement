import React, { useState } from 'react';
import { Flex, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { TextArea } = Input;

const StyledCard = styled(Flex)`
  border: 1px solid #cc8e1e;
  border-radius: 10px;
  background: white;
  margin-bottom: 15px;
`;
const StyledInputsWrapper = styled(Flex)`
  padding: 15px;
  width: 100%;
`;
export const AddItem: React.FC = () => {
  const [isShown, setIsShown] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('Change:', e.target.value);
  };

  const renderContent = () => {
    if (isShown) {
      return (
        <StyledInputsWrapper vertical gap={32}>
          <>
            <Input
              showCount
              maxLength={30}
              onChange={onChange}
              placeholder="Title"
            />
            <TextArea
              rows={4}
              showCount
              maxLength={200}
              onChange={onChange}
              placeholder="Description"
              style={{ height: 120, resize: 'none' }}
            />
          </>
          <Flex justify="center" gap={10}>
            <Button style={{ width: '200px' }} size="large">
              Save
            </Button>
            <Button
              style={{ width: '200px' }}
              size="large"
              onClick={() => setIsShown(!isShown)}
            >
              Cancel
            </Button>
          </Flex>
        </StyledInputsWrapper>
      );
    }
    return (
      <Button
        style={{ margin: '50px' }}
        icon={<PlusOutlined />}
        size="large"
        onClick={() => setIsShown(!isShown)}
      />
    );
  };

  return <StyledCard justify="center">{renderContent()}</StyledCard>;
};
