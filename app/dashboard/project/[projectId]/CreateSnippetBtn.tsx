import React from 'react';
import { Button } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {
  projectId: string;
  style?: React.CSSProperties; // Allow style to be passed as a prop
}

function CreateSnippetBtn({ projectId, style }: Props) {
  return (
    <div>
      <Link href={`http://localhost:3000/dashboard/project/${projectId}/new-snippet`}>
        <Button
          variant="solid"
          size="2"
          color="blue"
          style={{
            height: '40px', // Default height
            padding: '0 16px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '6px', // Default radius
            ...style, // Merge passed style prop
          }}
        >
          <PlusIcon />
          Create Snippet
        </Button>
      </Link>
    </div>
  );
}

export default CreateSnippetBtn;
