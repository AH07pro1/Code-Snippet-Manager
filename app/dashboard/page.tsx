import React from 'react';
import SnippetGrid from './SnippetGrid';
import CreateSnippetBtn from './CreateSnippetBtn';

function DashboardPage() {
  return (
    <div style={{ padding: '20px' }}>
      <CreateSnippetBtn/>
      <SnippetGrid/>
    </div>
  );
}

export default DashboardPage;
