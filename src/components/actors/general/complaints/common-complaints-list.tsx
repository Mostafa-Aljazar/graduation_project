'use client';

import { Stack, Group, Text, Flex, Pagination, Center } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { Complaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import Common_Complaint_Card from './complaint/common-complaint-card';
import { UserRank, UserType } from '@/constants/userTypes';
import Common_Complaint_Skeleton from './complaint/common-complaint-skeleton';

interface CommonComplaintsListProps {
  complaints: Complaint[];
  total_pages: number;
  loading: boolean;
  actor_Id: number;
  role: UserType | UserRank;
}

export default function Common_Complaints_List({
  complaints,
  total_pages,
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
          {Array.from({ length: 8 }).map((_, index) => (
            <Common_Complaint_Skeleton key={index} />
          ))}
        </Stack>
      ) : complaints.length === 0 ? (
        <Center mt={30} mih={200} className='bg-gray-50 p-6 border-1 border-gray-200 rounded-md'>
          <Stack align='center' gap={6}>
            <MessageCircleWarning size={40} className='text-primary' />
            <Text fw={600} fz='lg' className='text-primary'>
              لا توجد شكاوي لعرضها
            </Text>
          </Stack>
        </Center>
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

      {!loading && total_pages > 1 && (
        <Flex justify='center' mt='md'>
          <Pagination
            value={query['complaints-page']}
            onChange={(value: number) => setQuery({ 'complaints-page': value })}
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
