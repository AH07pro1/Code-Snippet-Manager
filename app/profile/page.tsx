'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

function ProfilePage() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>You are not signed in.</p>
      </div>
    );
  }

  const { user } = session;

  const toggleMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">

      {/* Avatar */}
      <Avatar.Root className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <Avatar.Image
          className="w-full h-full object-cover"
          src={user?.image || 'https://via.placeholder.com/150'}
          alt={user?.name || 'User Avatar'}
        />
        <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground text-2xl">
          {user?.name?.charAt(0) || 'U'}
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Name */}
      <h1 className="text-2xl font-bold mb-2">{user?.name || 'Unknown User'}</h1>
      <p className="text-center mb-6">No bio available.</p>

      {/* Info Card */}
      <div className="bg-card p-4 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Email</h2>
          <p>{user?.email || 'No email'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Location</h2>
          <p>Not provided</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Member Since</h2>
          <p>{user?.createdAt ? new Date(user.createdAt).toDateString() : 'Unknown'}</p>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="mt-6 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90">
            Edit Profile
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-lg font-bold mb-4">Edit Profile</Dialog.Title>
            <Dialog.Close asChild>
              <button className="mt-4 bg-muted text-muted-foreground py-2 px-4 rounded-lg hover:bg-muted/80">
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Theme Toggle + Sign Out (horizontal layout) */}
      <div className="flex flex-row items-center justify-center gap-4 mt-6">
        <Button 
          variant="ghost" 
          size="2" 
          onClick={toggleMode} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>

        <Button 
          variant="solid" 
          color="red" 
          size="2" 
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>

    </div>
  );
}

export default ProfilePage;
