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

const SkeletonCard = () => (
  <Paper withBorder radius='md' p='md' bg='gray.0' className='shadow-sm w-full'>
    <Group gap='sm'>
      <Skeleton height={40} width={40} circle />
      <Stack gap={6} flex={1}>
        <Skeleton height={12} width='60%' radius='xl' />
        <Skeleton height={10} width='40%' radius='xl' />
      </Stack>
    </Group>
  </Paper>
);

interface DisplacedReceivedAidsListProps {
  received_aids: DisplacedReceivedAid[];
  total_pages: number;
  loading: boolean;
}

export default function Displaced_Received_Aids_List({
  received_aids,
  total_pages,
  loading,
}: DisplacedReceivedAidsListProps) {
  const [query, setQuery] = useQueryStates({
    'received-aids-page': parseAsInteger.withDefault(1),
  });

  return (
    <Stack pos='relative' gap='sm'>
      {loading ? (
        <Stack gap='xs'>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </Stack>
      ) : received_aids.length === 0 ? (
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
          {received_aids.map((received_aid) => (
            <Displaced_Received_Aid_Card
              key={received_aid.id}
              received_aid={received_aid}
            />
          ))}
        </Stack>
      )}

      {!loading && total_pages > 1 && (
        <Flex justify='center' mt='md'>
          <Pagination
            value={query['received-aids-page']}
            onChange={(value: number) =>
              setQuery({ 'received-aids-page': value })
            }
            total={total_pages}
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
