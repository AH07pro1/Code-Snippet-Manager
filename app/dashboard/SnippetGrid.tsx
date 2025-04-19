import React from 'react';
import SnippetCard from '../components/SnippetCard';

function SnippetGrid() {
  const snippets = [1, 2, 3, 4, 5, 6]; 

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >

      {snippets.map((snippet, index) => (
        <SnippetCard key={index} />
      ))}
    </div>
  );
}

export default SnippetGrid;
