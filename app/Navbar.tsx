import React from 'react';
import { Button, Flex, Text, Box } from '@radix-ui/themes';
import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function Navbar() {
  return (
    <Box
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* App Name */}
      <Text weight="bold" size="4">
        CodeNest
      </Text>

      {/* Navigation Links and Profile */}
      <Flex gap="3" align="center">
        {/* Dashboard Link */}
        <Button
          variant="solid"
          color="blue"
          size="2"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <DashboardIcon style={{ marginRight: '8px' }} />
          <Link href="/dashboard">Dashboard</Link>
        </Button>

        {/* Profile Icon */}
        <Button
          variant="ghost"
          size="2"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <PersonIcon style={{ marginRight: '8px' }} />
          <span>Profile</span>
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;
