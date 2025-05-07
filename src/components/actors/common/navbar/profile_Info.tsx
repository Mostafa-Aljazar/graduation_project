'use client';
import { man } from '@/assets/common';
import useAuth from '@/hooks/useAuth';
import { getSession } from '@/utils/auth/getSession';
import { logout } from '@/utils/auth/logout';
import { Box, Button, Group, Stack, Text } from '@mantine/core';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function Profile_Info() {
  const { user, isDelegate, isDisplaced, isSecurity, isSecurityOfficer } =
    useAuth();

  return (
    <Stack
      w='100%'
      justify='center'
      align='center'
      gap={10}
      pb={10}
      className='!shadow-xl !rounded-[20px] !overflow-hidden'
    >
      {/* Image */}
      <Box
        w='100%'
        h={70}
        className='!relative !bg-gradient-to-l !from-primary !to-white !rounded-[20px]'
      >
        <Box
          pos='absolute'
          bottom='-50%'
          left='50%'
          className='bg-primary !rounded-full !overflow-hidden !-translate-x-1/2'
          w={85}
          h={85}
        >
          <Image
            src={user?.image || man}
            alt='Profile'
            width={85}
            height={85}
            className='!object-cover'
          />
        </Box>
      </Box>

      <Group
        justify='center'
        align='baseline'
        gap={3}
        px={5}
        mt={30}
        wrap='nowrap'
      >
        <Text fw={500} fz={18} c='white' className='!text-primary !text-nowrap'>
          {isSecurity
            ? 'الأمن :'
            : isSecurityOfficer
            ? 'مسؤول الأمن :'
            : isDelegate
            ? 'المندوب :'
            : isDisplaced
            ? 'النازح :'
            : 'المدير :'}
        </Text>
        <Text fw={400} fz={16} c='white' className='!text-primary'>
          {user?.name}
        </Text>
      </Group>
      <Text
        fw={400}
        fz={14}
        c='white'
        ta='center'
        className='!text-primary'
        dir='ltr'
      >
        {user?.idNumber ?? 'لا يوجد رقم هوية'}
      </Text>

      <Button
        variant='transparent'
        size='xs'
        radius='md'
        fw={500}
        fz={16}
        color='gray'
        leftSection={<LogOut size={20} />}
        onClick={logout}
      >
        تسجيل الخروج
      </Button>
    </Stack>
  );
}
