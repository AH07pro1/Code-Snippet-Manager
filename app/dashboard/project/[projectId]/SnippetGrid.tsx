'use client';

import React, { useEffect, useState } from 'react';
import SnippetCard from '@/app/components/SnippetCard';
import { redirect } from 'next/navigation';
import { useSession } from "next-auth/react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import CreateSnippetBtn from './CreateSnippetBtn';

interface SnippetGridProps {
  projectId: string;
}

function SnippetGrid({ projectId }: SnippetGridProps) {
  const { data: session, status } = useSession();
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch(`/api/snippets?userId=${session.user.id}&projectId=${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch snippets');
        }
        const data = await response.json();
        setSnippets(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchSnippets();
    }
  }, [session, status, projectId]);

  const filteredSnippets = selectedLanguage === 'All' 
    ? snippets 
    : snippets.filter(snippet => snippet.language === selectedLanguage);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const languages = ['All', ...new Set(snippets.map(snippet => snippet.language))];

  const handleDeleteProject = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      alert('Project deleted successfully!');
      redirect('/dashboard');  // Redirect to dashboard after successful deletion
    } catch (error: any) {
      console.error('Error deleting project:', error);
      alert('An error occurred while deleting the project.');
    }
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      {/* Top Controls: Filter + Create Button */}
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '20px'
      }}>
        {/* Create Snippet Button */}
        <CreateSnippetBtn 
          projectId={projectId}
          style={{
            height: '40px', 
            padding: '0 16px',
            fontSize: '14px',
            borderRadius: '6px',
          }}
        />

        {/* Filter Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger 
            style={{ 
              height: '40px', 
              padding: '0 16px',
              fontSize: '14px',
              border: '1px solid #ccc', 
              borderRadius: '6px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              backgroundColor: '#fff', 
              color: '#333'
            }}
          >
            Filter by Language <ChevronDownIcon />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content 
            side="bottom"
            align="start"
            style={{ 
              padding: '10px', 
              backgroundColor: '#fff', 
              borderRadius: '6px', 
              boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', 
              minWidth: '200px', 
              zIndex: 9999,
              marginTop: '4px'
            }}
          >
            {languages.map(language => (
              <DropdownMenu.Item 
                key={language} 
                onSelect={() => setSelectedLanguage(language)} 
                style={{
                  padding: '8px 12px', 
                  cursor: 'pointer', 
                  fontSize: '14px', 
                  color: '#333',
                  backgroundColor: '#fff',
                  transition: 'background-color 0.2s ease',
                }}
              >
                {language}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      {/* Delete Project Button */}
      <button 
        onClick={handleDeleteProject} 
        style={{
          position: 'absolute',
          top: '20px', // Position from the top
          right: '20px', // Position from the right
          height: '40px',
          padding: '0 16px',
          fontSize: '14px',
          borderRadius: '6px',
          backgroundColor: '#f44336',
          color: '#fff',
          cursor: 'pointer',
          border: 'none',
          transition: 'background-color 0.2s ease',
        }}
      >
        Delete Project
      </button>

      {/* Snippet Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet: any, index: number) => (
            <SnippetCard
              key={index}
              title={snippet.title}
              language={snippet.language}
              content={snippet.content}
              icon={snippet.icon}
              onViewClick={() => redirect(`/dashboard/project/${snippet.projectId}/${snippet.id}`)}
            />
          ))
        ) : (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#888',
              fontSize: '20px',
            }}
          >
            No snippets found.
          </div>
        )}
      </div>
    </div>
  );
}

export default SnippetGrid;
