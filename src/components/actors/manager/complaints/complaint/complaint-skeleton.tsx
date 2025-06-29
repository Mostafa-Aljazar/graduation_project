import { Card, Flex, Group, Skeleton, Stack } from '@mantine/core';

export default function Complaint_Skeleton() {
  return (
    <>
      <Card p='xs' radius='md' className='!border-1 !border-gray-200'>
        <Group>
          <Skeleton height={60} width={60} circle />
          <Stack flex={1} gap={0}>
            <Flex
              gap={10}
              direction='row'
              justify={{ base: 'right', md: 'left' }}
            >
              <Skeleton height={12} width={50} radius='sm' />
              <Skeleton height={12} width={50} radius='sm' />
            </Flex>
            <Skeleton height={16} width='40%' radius='sm' mt={4} />
            <Skeleton height={16} width='60%' radius='sm' mt={4} />
          </Stack>
          <Skeleton height={24} width={24} circle />
        </Group>
      </Card>
    </>
  );
}
