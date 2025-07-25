'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Text,
  Center,
  Loader,
  Stack,
  ThemeIcon,
  Paper,
} from '@mantine/core';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { getDisplacedReceivedAids } from '@/actions/actors/displaced/received-aids/getDisplacedReceivedAids';
import { DisplacedReceivedAidsResponse } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';
import Displaced_Received_Aids_List from './displaced-received-aids-list';
import { MessageCircleWarning } from 'lucide-react';
import { DISPLACED_RECEIVED_AIDS_TABS } from '@/@types/actors/common-types/index.type';

interface DelegateComplaintsContentProps {
  displaced_Id: number;
}

export default function Displaced_Received_Aid_Content({
  displaced_Id,
}: DelegateComplaintsContentProps) {
  const [query, setQuery] = useQueryStates({
    'received-aids-tab': parseAsStringEnum<DISPLACED_RECEIVED_AIDS_TABS>(
      Object.values(DISPLACED_RECEIVED_AIDS_TABS)
    ).withDefault(DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS),
    'received-aids-page': parseAsInteger.withDefault(1),
  });

  const limit = 7;

  const {
    data: displacedReceivedAids,
    isLoading,
    error,
  } = useQuery<DisplacedReceivedAidsResponse>({
    queryKey: ['receivedAids', query],
    queryFn: () =>
      getDisplacedReceivedAids({
        page: query['received-aids-page'],
        limit: limit,
        tab_type: query['received-aids-tab'],
        displaced_Id: displaced_Id,
      }),
    enabled: !!displaced_Id,
  });

  const hasError = Boolean(error) || Boolean(displacedReceivedAids?.error);

  return (
    <Box dir='rtl' w='100%'>
      {hasError ? (
        <Paper
          p='md'
          withBorder
          mt='md'
          className='!bg-red-100 rounded-md text-center'
        >
          <Box>
            <Center mb='sm'>
              <ThemeIcon color='red' variant='light' size='lg'>
                <MessageCircleWarning />
              </ThemeIcon>
            </Center>
            <Text c='red' fw={600}>
              {displacedReceivedAids?.error ||
                error?.message ||
                'حدث خطأ أثناء جلب المساعدات'}
            </Text>
          </Box>
        </Paper>
      ) : (
        <Displaced_Received_Aids_List
          received_aids={displacedReceivedAids?.received_aids || []}
          total_pages={displacedReceivedAids?.pagination.total_pages || 1}
          loading={isLoading}
        />
      )}
    </Box>
  );
}
