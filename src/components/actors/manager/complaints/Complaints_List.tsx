'use client';

import { Stack, Group, Text, Flex, Pagination } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { Complaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import Complaint_Skeleton from './complaint/Complaint_Skeleton';
import Complaint_Card from './complaint/Complaint_Card';

interface ComplaintsListProps {
  complaints: Complaint[];
  activePage: number;
  setActivePage: (page: number) => void;
  itemsPerPage: number;
  totalPages: number;
  loading: boolean;
}

export default function ComplaintsList({
  complaints,
  activePage,
  setActivePage,
  totalPages,
  loading,
}: ComplaintsListProps) {
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
            <Complaint_Card key={complaint.id} complaint={complaint} />
          ))}
        </Stack>
      )}
      {!loading && totalPages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={activePage}
            onChange={setActivePage}
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
