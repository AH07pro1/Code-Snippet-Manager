'use client';

import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Button, Flex, Text, Box } from '@radix-ui/themes';
import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTheme } from 'next-themes';

function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  // Force system theme when logged out
  useEffect(() => {
    if (status === 'unauthenticated') {
      setTheme('system');
    }
  }, [status, setTheme]);

  return (
    <Box
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* App Name + Icon */}
      <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Flex align="center" gap="2">
          <img
            src={theme === 'dark' ? '/white_code_nest_icon.png' : '/code nest icon.png'}
            alt="Code Nest Icon"
            style={{ width: '32px', height: '32px' }}
          />
          <Text weight="bold" size="4">
            CodeNest
          </Text>
        </Flex>
      </Link>

      {/* Navigation */}
      <Flex gap="3" align="center">
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Button variant="solid" color="blue" size="2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DashboardIcon />
            Dashboard
          </Button>
        </Link>

        <Link href="/profile" style={{ textDecoration: 'none' }}>
          <Button variant="ghost" size="2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PersonIcon />
            Profile
          </Button>
        </Link>

        {/* Only show Login button if not authenticated */}
        {status === 'unauthenticated' && (
          <Button
            variant="outline"
            size="2"
            onClick={() => signIn()}
            style={{ marginLeft: '10px' }}
          >
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;
