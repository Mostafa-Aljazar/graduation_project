import { Card, Flex, Group, Skeleton, Stack } from '@mantine/core';

export default function Common_Complaint_Skeleton() {
  return (
    <Card
      p='md'
      radius='lg'
      shadow='sm'
      className='bg-gray-50 !border !border-gray-300'
    >
      <Group align='flex-start' gap='md'>
        <Skeleton height={60} width={60} radius={999} />

        <Stack flex={1} gap={4}>
          <Flex justify='space-between' wrap='wrap'>
            <Skeleton height={12} width={100} radius='sm' />
            <Skeleton height={12} width={80} radius='sm' />
          </Flex>

          <Flex gap={8}>
            <Skeleton height={14} width={50} radius='sm' />
            <Skeleton height={14} width={120} radius='sm' />
          </Flex>

          <Skeleton height={16} width='60%' radius='sm' />
        </Stack>

        <Skeleton height={24} width={24} radius={999} />
      </Group>
    </Card>
  );
}
