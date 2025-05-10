import React from 'react';
import SnippetGrid from './SnippetGrid';
import CreateSnippetBtn from './CreateSnippetBtn';
import CreateProjectBtn from './CreateProjectBtn';

function DashboardPage() {
  return (
    <div style={{ padding: '20px' }}>
      <CreateSnippetBtn/>
      <CreateProjectBtn/>
      <SnippetGrid/>
    </div>
  );
}

export default DashboardPage;
