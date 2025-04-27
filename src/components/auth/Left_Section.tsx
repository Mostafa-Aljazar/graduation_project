import { Group, Stack, Text } from '@mantine/core';
import { MoveRight } from 'lucide-react';
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
          lh={1.6}
          w={{ base: 300, md: 600, lg: 390 }}
          fz={{ base: 30, md: 40, lg: 45 }}
        >
          مرحباً بك في مخيم الأقصى لأيواء النازحين 👋
          {/* استكشف المساعدات أو قم بإدارة الخدمات */}
        </Text>
        <Group
          justify='space-between'
          align='center'
          px={16}
          py={8}
          w={{ base: 300, md: 600, lg: 390 }}
          h={{ base: 43, lg: 39 }}
          c={'white'}
          className='!bg-transparent !border-[#757474] !border-[1px] !rounded-lg !transition-colors !duration-300'
        >
          <Text fw={500} fz={16}>
            استكشف المساعدات أو قم بإدارة الخدمات
            {/* اختر دورك للبدء  */}
          </Text>
          <MoveRight strokeWidth={1} className='rtl:!rotate-180' />
        </Group>
      </Stack>
    </Stack>
  );
}
