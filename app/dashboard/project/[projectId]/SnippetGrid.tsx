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

  if (snippets.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>No snippets found.</div>;
  }

  const languages = ['All', ...new Set(snippets.map(snippet => snippet.language))];

  return (
    <div style={{ padding: '20px' }}>
      {/* Top Controls: Filter + Create Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '20px',
      }}>
        
        {/* Create Snippet Button */}
        <CreateSnippetBtn 
          projectId={projectId}
          style={{
            height: '40px', // Fixed height
            padding: '0 16px',
            fontSize: '14px',
            borderRadius: '6px', // Same radius as dropdown
          }}
        />

        {/* Filter Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger 
            style={{ 
              height: '40px', // Match button height
              padding: '0 16px',
              fontSize: '14px',
              border: '1px solid #ccc', 
              borderRadius: '6px', // Same radius as button
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

      {/* Snippet Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredSnippets.map((snippet: any, index: number) => (
          <SnippetCard
            key={index}
            title={snippet.title}
            language={snippet.language}
            content={snippet.content}
            icon={snippet.icon}
            onViewClick={() => redirect(`/dashboard/project/${snippet.projectId}/${snippet.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default SnippetGrid;
