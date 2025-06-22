'use client';
import {
  GET_AIDS_TYPE_ICONS,
  TYPE_AIDS,
} from '@/content/actor/manager/aids-management';
import { cn } from '@/utils/cn';
import { Card, Center, Flex, Group, Stack, Text } from '@mantine/core';
import { Package, UsersRound } from 'lucide-react';
import Aid_Action from './aid-action';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';

interface Props {
  aid: Aid;
}
export default function Aid_Card({ aid }: Props) {
  // Map aid type to its corresponding icon, default to Package if not found
  const getAidTypeIcon = (type: TYPE_AIDS) => {
    const IconComponent = GET_AIDS_TYPE_ICONS[type] || Package;
    return <IconComponent size={20} className='text-white' />;
  };

  const router = useRouter();
  const { user } = useAuth();
  const handleClick = (e: React.MouseEvent) => {
    //hint: TO PREVENT DO Another Action
    const path = e.nativeEvent.composedPath() as HTMLElement[];
    const clickedOnCard = path.some((el) => {
      const attr = (el as HTMLElement)?.getAttribute?.('data-click');
      const classes = (el as HTMLElement)?.classList?.toString() || '';
      return attr === 'aid-card' || classes.includes('aid-card');
    });

    if (clickedOnCard) {
      router.push(`${MANAGER_ROUTES_fUNC(user?.id as number, aid.id).AID}?`);
    }
  };

  return (
    <Card
      data-click='aid-card'
      key={aid.id}
      p='xs'
      className={cn(
        'border-1 border-gray-200 rounded-lg !bg-green-100  hover:bg-gray-50 hover:scale-98 transition-all duration-300 ease-in-out   hover:cursor-pointer !shadow-md ',
        aid.isCompleted && '!bg-red-100'
      )}
      onClick={handleClick}
    >
      <Group>
        <Center
          w={48}
          h={48}
          className='bg-primary border-1 border-gray-300 rounded-full'
        >
          {getAidTypeIcon(aid.aidType as TYPE_AIDS)}
        </Center>
        <Stack flex={1} gap={5}>
          <Group justify='space-between'>
            <Flex
              direction={{ base: 'column-reverse', sm: 'row' }}
              flex={1}
              justify='space-between'
              wrap='wrap-reverse'
              gap={0}
            >
              <Text fz='md' fw={600} className='!text-primary'>
                {aid.aidName || `مساعدة: ${aid.aidType}`}
              </Text>
              <Text fz={14} c='dimmed'>
                {(aid.deliveryDate as Date).toDateString()}
              </Text>
            </Flex>

            <Aid_Action aid_ID={aid.id} />
          </Group>
          <Group gap={20}>
            <Group gap={5}>
              <UsersRound size={15} className='!text-primary' />
              <Text fz={14} className='!text-dark'>
                عدد المستفيدين: {aid.selectedDisplacedIds.length}
              </Text>
            </Group>
            <Group gap={5}>
              <UsersRound size={15} className='!text-primary' />
              <Text fz={14} className='!text-dark'>
                عدد المستلمين: {aid.receivedDisplaced.length}
              </Text>
            </Group>
          </Group>
          {aid.aidAccessories && (
            <Text fz={14} c='dimmed'>
              {aid.aidAccessories}
            </Text>
          )}
        </Stack>
      </Group>
    </Card>
  );
}
