'use client';

import { DisplacedReceivedAid } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';
import {
  Stack,
  Group,
  Text,
  Flex,
  Pagination,
  Center,
  Skeleton,
  Paper,
} from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
import Displaced_Received_Aid_Card from './received-aid/displaced-received-aid-card';

interface DisplacedReceivedAidsListProps {
  receivedAids: DisplacedReceivedAid[];
  itemsPerPage: number;
  totalPages: number;
  loading: boolean;
  displaced_Id: number;
}

export default function Displaced_Received_Aids_List({
  receivedAids,
  totalPages,
  loading,
  displaced_Id,
}: DisplacedReceivedAidsListProps) {
  const [query, setQuery] = useQueryStates({
    'received-aids-page': parseAsInteger.withDefault(1),
  });

  const SkeletonCard = () => (
    <Paper
      withBorder
      radius='md'
      p='md'
      bg='gray.0'
      className='shadow-sm w-full'
    >
      <Group gap='sm'>
        <Skeleton height={40} width={40} circle />
        <Stack gap={6} flex={1}>
          <Skeleton height={12} width='60%' radius='xl' />
          <Skeleton height={10} width='40%' radius='xl' />
        </Stack>
      </Group>
    </Paper>
  );

  return (
    <Stack pos='relative' gap='sm'>
      {loading ? (
        <Stack gap='xs'>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </Stack>
      ) : receivedAids.length === 0 ? (
        <Center
          mt={30}
          mih={200}
          className='bg-gray-50 p-6 border-1 border-gray-200 rounded-md'
        >
          <Stack align='center' gap={6}>
            <MessageCircleWarning size={40} className='text-primary' />
            <Text fw={600} fz='lg' className='text-primary'>
              لا توجد مساعدات لعرضها
            </Text>
          </Stack>
        </Center>
      ) : (
        <Stack gap='xs'>
          {receivedAids.map((receivedAid) => (
            <Displaced_Received_Aid_Card
              key={receivedAid.id}
              receivedAid={receivedAid}
              displaced_Id={displaced_Id}
            />
          ))}
        </Stack>
      )}

      {!loading && totalPages > 1 && (
        <Flex justify='center' mt='md'>
          <Pagination
            value={query['received-aids-page']}
            onChange={(value: number) =>
              setQuery({ 'received-aids-page': value })
            }
            total={totalPages}
            size='sm'
            radius='xl'
            withControls={false}
            mx='auto'
            classNames={{
              dots: '!rounded-full !text-gray-300 border-1',
              control: '!rounded-full',
            }}
          />
        </Flex>
      )}
    </Stack>
  );
}
