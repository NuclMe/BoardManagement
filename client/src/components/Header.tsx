import React, { useState, useEffect } from 'react';
import {
  useLazyGetAllIssuesQuery,
  // useLazyGetRepoInfoQuery,
  // useLazyGetOpenAssignedIssuesQuery,
  // useLazyGetClosedIssuesQuery,
} from '../redux/issuesApi';
import { useDispatch } from 'react-redux';
import {
  setIssuesData,
  // setRepoInfo,
  // setOpenAssignedIssues,
  // setClosedIssues,
} from '../redux';
import { Input, Button, Flex } from 'antd';

export const Header: React.FC = () => {
  const [links, setLinks] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const savedLinks = localStorage.getItem('repoLink');
    if (savedLinks) {
      setLinks(savedLinks);
    }
  }, []);

  const [triggerGetAllIssues] = useLazyGetAllIssuesQuery();
  // const [triggerGetRepoInfo] = useLazyGetRepoInfoQuery();
  // const [triggerGetOpenAssignedIssues] = useLazyGetOpenAssignedIssuesQuery();
  // const [triggerGetClosedIssues] = useLazyGetClosedIssuesQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks(e.target.value);
    localStorage.setItem('repoLink', e.target.value);
  };
  const getIssues = async () => {
    // const parts = links.split('/');
    // const repoName = parts[parts.length - 1];
    // const userName = parts[parts.length - 2];

    const { data } = await triggerGetAllIssues(links);
    // const { data: repoInfo } = await triggerGetRepoInfo({ userName, repoName });
    // const { data: openAssignedIssues } = await triggerGetOpenAssignedIssues({
    //   userName,
    //   repoName,
    // });
    // const { data: closedIssues } = await triggerGetClosedIssues({
    //   userName,
    //   repoName,
    // });

    if (data && repoInfo && openAssignedIssues && closedIssues) {
      dispatch(setIssuesData(data));
      // dispatch(setRepoInfo(repoInfo));
      // dispatch(setOpenAssignedIssues(openAssignedIssues));
      // dispatch(setClosedIssues(closedIssues));
    }
  };
  return (
    <header>
      <Flex gap="large">
        <Input
          placeholder="Enter a board ID here..."
          onChange={handleInputChange}
        />
        <Button
          style={{ width: '200px' }}
          type="primary"
          size="middle"
          onClick={getIssues}
        >
          Load
        </Button>
        <Button
          style={{ width: '200px' }}
          type="primary"
          size="middle"
          color="default"
          variant="solid"
        >
          Create board
        </Button>
      </Flex>
    </header>
  );
};
