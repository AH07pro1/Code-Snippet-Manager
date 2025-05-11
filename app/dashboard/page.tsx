import React from 'react';
import CreateSnippetBtn from './project/[projectId]/CreateSnippetBtn';
import CreateProjectBtn from './CreateProjectBtn';
import ProjectGrid from './ProjectGrid';

function DashboardPage() {
  return (
    <div style={{ padding: '20px' }}>
      <CreateProjectBtn/>
      <ProjectGrid/>
    </div>
  );
}

export default DashboardPage;
