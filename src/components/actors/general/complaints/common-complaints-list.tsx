'use client';

import { Stack, Group, Text, Flex, Pagination } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { Complaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import Complaint_Skeleton from '../../manager/complaints/complaint/complaint-skeleton';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import Common_Complaint_Card from './complaint/common-complaint-card';

interface CommonComplaintsListProps {
  complaints: Complaint[];
  totalPages: number;
  loading: boolean;
  actor_Id: number;
  role: 'DELEGATE' | 'SECURITY';
}

export default function Common_Complaints_List({
  complaints,
  totalPages,
  loading,
  actor_Id,
  role,
}: CommonComplaintsListProps) {
  const [query, setQuery] = useQueryStates({
    search: parseAsString.withDefault(''),
    'complaints-page': parseAsInteger.withDefault(1),
  });

  return (
    <Stack pos={'relative'}>
      {loading ? (
        <Stack gap='xs'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Complaint_Skeleton key={index} />
          ))}
        </Stack>
      ) : complaints.length === 0 ? (
        <Group gap={10} w={'100%'} justify='center' mt={30}>
          <MessageCircleWarning size={25} className='!text-primary' />
          <Text fw={500} fz={24} ta='center' className='!text-primary'>
            لا توجد شكاوي لعرضها
          </Text>
        </Group>
      ) : (
        <Stack gap='xs'>
          {complaints.map((complaint) => (
            <Common_Complaint_Card
              key={complaint.id}
              complaint={complaint}
              actor_Id={actor_Id}
              role={role}
            />
          ))}
        </Stack>
      )}
      {!loading && totalPages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={query['complaints-page']}
            onChange={(value: number) => setQuery({ 'complaints-page': value })}
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
