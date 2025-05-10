import React from 'react';
import { Button } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function CreateProjectBtn() {
    return (
        <div>
            <Link href="/new-project" passHref>
                <Button
                    variant="solid"
                    size="2"
                    color="blue"
                    style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}
                >
                    <PlusIcon />
                    Create Project
                </Button>
            </Link>
        </div>
    );
}

export default CreateProjectBtn;
