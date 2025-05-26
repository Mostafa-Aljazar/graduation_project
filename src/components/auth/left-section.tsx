import { Flex, Stack, Text } from '@mantine/core';
import { MoveLeft } from 'lucide-react';
export default function Left_Section() {
  return (
    <Stack justify='center' align='center' h={{ base: '100%', lg: '100vh' }}>
      <Stack
        justify='flex-start'
        align='flex-start'
        gap={28}
        px={{ base: 40, md: 0 }}
      >
        <Text
          c={'white'}
          fw={500}
          ta={'start'}
          w={{ base: 350, md: 600, lg: 450 }}
          fz={{ base: 30, md: 40 }}
        >
          مرحباً بك في مخيم الأقصى لأيواء النازحين 👋
        </Text>
        <Flex
          direction={'row'}
          justify='space-between'
          align='center'
          px={16}
          py={8}
          w={{ base: '100%', md: 600, lg: 390 }}
          h={{ base: 43, lg: 39 }}
          c={'white'}
          wrap='nowrap'
          className='!bg-transparent !border-[1px] !border-gray-300 !rounded-lg !text-nowrap !transition-colors !duration-300'
        >
          <Text fw={500} fz={{ base: 14, md: 16 }}>
            استكشف المساعدات أو قم بإدارة الخدمات
          </Text>
          <MoveLeft strokeWidth={1} />
        </Flex>
      </Stack>
    </Stack>
  );
}
