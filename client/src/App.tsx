import React, { useState } from 'react';
import './App.css';
import { Header, Columns } from './components';

export const App: React.FC = () => {
  const [hasData, setHasData] = useState(false);

  return (
    <>
      <Header setHasData={setHasData} />

      {hasData && <Columns />}
    </>
  );
};
