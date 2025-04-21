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
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

function SnippetDetailComponent({
  snippetId,
  title: initialTitle,
  description: initialDescription,
  content,
  tags,
  createdAt,
  updatedAt,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [code, setCode] = useState(content);
  const [status, setStatus] = useState('');

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined){
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
          title: title,
          description: description,
          content: code,
          updatedAt: Date.now(),
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

  return (
    <Box maxWidth="800px" mx="auto" mt="6">
      <Card size="4" variant="classic">
        <Flex direction="column" gap="4">
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
              defaultLanguage="javascript"
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
