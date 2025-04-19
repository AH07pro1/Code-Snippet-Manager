import React from 'react';
import { Button } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons'; // Import the Plus Icon

function CreateSnippetBtn() {
    return (
        <div>
            <Button
                variant="solid"
                size="2"
                color="blue"
                style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}
            >
                <PlusIcon />
                Create Snippet
            </Button>
        </div>
    );
}

export default CreateSnippetBtn;
