'use client';

import React, { useState } from 'react';
import {
  Box,
  Text,
  Card,
  Flex,
  Badge,
  Button,
} from '@radix-ui/themes';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor (no SSR)
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <Text>Loading editor...</Text>,
});

interface Props {
  snippetId: string;
  title: string;
  description: string;
  language: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

function SnippetDetailComponent({
  snippetId,
  title: initialTitle,
  description: initialDescription,
  language: initialLanguage,
  content,
  tags,
  createdAt,
  updatedAt,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [code, setCode] = useState(content);
  const [language, setLanguage] = useState(initialLanguage); // Language state
  const [status, setStatus] = useState('');

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      console.log('Code changed:', value);
    }
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      const res = await fetch(`http://localhost:3000/api/snippets/${snippetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content: code, language
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to update snippet');
      }

      setStatus('Saved successfully!');
    } catch (error: any) {
      console.error(error);
      setStatus(error.message);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage); // Update language
  };

  return (
    <Box maxWidth="800px" mx="auto" mt="6">
      <Card size="4" variant="classic">
        <Flex direction="column" gap="4" style={{ position: 'relative' }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Snippet Title"
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              border: 'none',
              outline: 'none',
              width: '100%',
              background: 'transparent',
            }}
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Snippet description..."
            style={{
              fontSize: '1rem',
              color: '#666',
              border: 'none',
              outline: 'none',
              width: '100%',
              background: 'transparent',
            }}
          />

          {/* Language Dropdown using Radix UI DropdownMenu (Positioned in top-right) */}
          <Flex
            
            style={{
              position: 'absolute',
              top: '16px', // distance from the top
              right: '16px', // distance from the right
            }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button >{language}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLanguageChange('javascript')}>JavaScript</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('python')}>Python</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('java')}>Java</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('cpp')}>C++</DropdownMenuItem>
                {/* Add more languages as needed */}
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>

          <Box
            style={{
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #ccc',
            }}
          >
            <Editor
              height="100%"
              language={language} // Set language dynamically
              value={code}
              theme="vs-dark"
              options={{
                readOnly: false,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
              }}
              onChange={handleCodeChange}
            />
          </Box>

          <Flex gap="2" wrap="wrap">
            {tags.map((tag, i) => (
              <Badge key={i} color="blue" variant="soft">
                #{tag}
              </Badge>
            ))}
          </Flex>

          <Text size="2" color="gray">
            Created: {new Date(createdAt).toLocaleString()}
          </Text>
          <Text size="2" color="gray">
            Updated: {new Date(updatedAt).toLocaleString()}
          </Text>

          <Button onClick={handleSave}>Save Changes</Button>
          <Text size="2" color="gray">{status}</Text>
        </Flex>
      </Card>
    </Box>
  );
}

export default SnippetDetailComponent;
