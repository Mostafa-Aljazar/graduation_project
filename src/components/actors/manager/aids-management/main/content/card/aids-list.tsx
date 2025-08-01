import { Stack, Group, Text, Flex, Pagination, Center } from '@mantine/core';
import { Package } from 'lucide-react';
import Aid_Card from './aid-card';
import Aid_Card_Skeleton from './aid-card-skeleton';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';

interface AidsListProps {
  data: Aid[];
  totalPages: number;
  isLoading: boolean;
  delegate_Id?: number;
}

export default function Aids_List({
  data,
  totalPages,
  isLoading,
  delegate_Id,
}: AidsListProps) {
  const [activePage, setActivePage] = useQueryState(
    'aids-page',
    parseAsInteger.withDefault(1)
  );

  return (
    <Stack pos={'relative'} py={20}>
      {isLoading ? (
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
            <Aid_Card aid={aid} key={aid.id} delegate_Id={delegate_Id} />
          ))}
        </Stack>
      )}
      {!isLoading && totalPages > 1 && (
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
