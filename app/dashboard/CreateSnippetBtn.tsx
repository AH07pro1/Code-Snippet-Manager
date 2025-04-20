import React from 'react';
import { Button } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function CreateSnippetBtn() {
    return (
        <div>
            <Link href="dashboard/new-snippet" passHref>
                <Button
                    variant="solid"
                    size="2"
                    color="blue"
                    style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}
                >
                    <PlusIcon />
                    Create Snippet
                </Button>
            </Link>
        </div>
    );
}

export default CreateSnippetBtn;
