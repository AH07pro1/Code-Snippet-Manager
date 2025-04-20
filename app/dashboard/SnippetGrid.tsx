"use client";
import React, { useEffect, useState } from 'react';
import SnippetCard from '../components/SnippetCard';

function SnippetGrid() {
  const [snippets, setSnippets] = useState<any[]>([]); // State to store fetched snippets
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  // Fetch snippets when the component mounts
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/snippets');
        if (!response.ok) {
          throw new Error('Failed to fetch snippets');
        }
        const data = await response.json();
        setSnippets(data); // Set the snippets data in state
      } catch (error: any) {
        setError(error.message); // Set error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSnippets();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading text while waiting for data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {snippets.map((snippet: any, index: number) => (
        <SnippetCard
          key={index}
          title={snippet.title}
          language={snippet.language}
          content={snippet.content}
        />
      ))}
    </div>
  );
}

export default SnippetGrid;
