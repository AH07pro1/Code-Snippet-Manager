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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { Cross2Icon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { supportedLanguages } from '@/app/data/supportedLanguages';

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
  icon?: string; // new icon prop for language icon URL
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
  icon: initialIcon,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [code, setCode] = useState(content);
  const [language, setLanguage] = useState(initialLanguage);
  const [icon, setIcon] = useState(initialIcon || '');
  const [status, setStatus] = useState('');

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      console.log('Code changed:', value);
    }
  };

  const handleLanguageChange = (newLanguage: string, newIcon: string) => {
    console.log('Changing language to:', newLanguage, newIcon);
    setLanguage(newLanguage);
    setIcon(newIcon);
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
          content: code,
          language,
          icon, // send the icon as well
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this snippet?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/snippets/${snippetId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete snippet');
      }
      alert('Snippet deleted!');
    } finally {
      redirect('/dashboard');
    }
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

          {/* Top right controls: language dropdown + delete icon */}
          <Flex
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {icon && (
                    <img
                      src={icon}
                      alt={`${language} icon`}
                      style={{ width: 20, height: 20, objectFit: 'contain' }}
                    />
                  )}
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                style={{
                  zIndex: 10,
                  backgroundColor: 'white',
                  color: 'black',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  borderRadius: '6px',
                  padding: '8px 0',
                }}
              >
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {supportedLanguages.map(({ name, icon }) => (
                  <DropdownMenuItem
                    key={name}
                    onClick={() => handleLanguageChange(name, icon)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <img
                      src={icon}
                      alt={`${name} icon`}
                      style={{ width: 20, height: 20, objectFit: 'contain' }}
                    />
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              onClick={handleDelete}
              aria-label="Delete snippet"
              style={{ padding: '6px' }}
            >
              <Cross2Icon />
            </Button>
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
              language={language.toLowerCase()}
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
          <Text size="2" color="gray">
            {status}
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}

export default SnippetDetailComponent;
