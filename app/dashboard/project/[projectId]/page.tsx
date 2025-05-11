'use client'; // <--- Add this at the very top!

import { useParams } from 'next/navigation';
import CreateSnippetBtn from './CreateSnippetBtn';
import SnippetGrid from './SnippetGrid';

function DetailProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string; // force it to string

  return (
    <div style={{ padding: '20px' }}>
      <SnippetGrid projectId={projectId}/>
    </div>
  );
}

export default DetailProjectPage;
