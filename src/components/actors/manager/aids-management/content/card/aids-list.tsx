import { Stack, Group, Text, Flex, Pagination, Center } from '@mantine/core';
import { Package } from 'lucide-react';
import { general_Aid } from '@/@types/actors/general/aids/aidsResponse.type';
import Aid_Card from './aid-card';
import Aid_Card_Skeleton from './aid-card-skeleton';

interface AidsListProps {
  data: general_Aid[];
  activePage: number;
  setActivePage: (page: number) => void;
  itemsPerPage: number;
  totalPages: number;
  loading: boolean;
  highlightedDate: string | null; // e.g., '2024-10-20' to highlight matching rows
}

export default function Aids_List({
  data,
  activePage,
  setActivePage,
  totalPages,
  loading,
  highlightedDate,
}: AidsListProps) {
  return (
    <Stack pos={'relative'} py={20}>
      {loading ? (
        <Stack gap='xs'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Aid_Card_Skeleton key={index} />
          ))}
        </Stack>
      ) : data.length === 0 ? (
        <Group gap={10} w={'100%'} justify='center' mt={30}>
          <Package size={25} className='!text-primary' />
          <Text fw={500} fz={24} ta='center' className='!text-primary'>
            لا توجد مساعدات لعرضها
          </Text>
        </Group>
      ) : (
        <Stack gap='xs'>
          {data.map((aid) => (
            <Aid_Card
              aid={aid}
              key={aid.id}
              highlightedDate={highlightedDate}
            />
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
