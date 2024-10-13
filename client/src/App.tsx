import React, { useState } from 'react';
import './App.css';
import { Header, Columns } from './components';

export const App: React.FC = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [hasData, setHasData] = useState(false);

  return (
    <>
      <Header setIsCreated={setIsCreated} setHasData={setHasData} />

      {(isCreated || hasData) && <Columns isCreated={isCreated} />}
    </>
  );
};
