import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';

function ProfilePage() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      
      {/* Profile Avatar */}
      <Avatar.Root className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-300">
        <Avatar.Image
          className="w-full h-full object-cover"
          src="https://via.placeholder.com/150"
          alt="User Avatar"
        />
        <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-400 text-white text-2xl">
          U
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Username */}
      <h1 className="text-2xl font-bold mb-2">Username</h1>

      {/* Bio */}
      <p className="text-center text-gray-600 mb-6">
        This is the user's bio. Short description about the user.
      </p>

      {/* User Info Card */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Email</h2>
          <p className="text-gray-700">user@example.com</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Location</h2>
          <p className="text-gray-700">City, Country</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Member Since</h2>
          <p className="text-gray-700">January 2024</p>
        </div>
      </div>

      {/* Optional Edit Profile Button */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-lg font-bold mb-4">Edit Profile</Dialog.Title>
            {/* Your form fields here */}
            <Dialog.Close asChild>
              <button className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}

export default ProfilePage;
