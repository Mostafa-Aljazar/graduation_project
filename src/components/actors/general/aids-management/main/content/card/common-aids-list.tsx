'use client';
import { Stack, Group, Text, Flex, Pagination } from '@mantine/core';
import { Package } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import Common_Aid_Card from './common-aid-card';
import Common_Aid_Card_Skeleton from './common-aid-card-skeleton';

interface CommonAidsListProps {
  data: Aid[];
  total_pages: number;
  isLoading: boolean;
  // delegate_Id?: number;
  actor_Id: number;
  role: Exclude<
    (typeof USER_TYPE)[UserType],
    | typeof USER_TYPE.SECURITY_OFFICER
    | typeof USER_TYPE.DISPLACED
    | typeof USER_TYPE.SECURITY
  >;
}

export default function Common_Aids_List({
  data,
  total_pages,
  isLoading,
  actor_Id,
  role,
}: // delegate_Id,
CommonAidsListProps) {
  console.log('🚀 ~ data:', data);
  const [activePage, setActivePage] = useQueryState(
    'aids-page',
    parseAsInteger.withDefault(1)
  );

  return (
    <Stack pos={'relative'} py={20}>
      {isLoading ? (
        <Stack gap='xs'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Common_Aid_Card_Skeleton key={index} />
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
            <Common_Aid_Card
              aid={aid}
              key={aid.id}
              actor_Id={actor_Id}
              role={role}
            />
          ))}
        </Stack>
      )}
      {!isLoading && total_pages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={activePage}
            onChange={setActivePage}
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
