'use client';

import { Card, Flex, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { cn } from '@/utils/cn';
import { useDisclosure } from '@mantine/hooks';
import { CalendarClock, CircleCheck } from 'lucide-react';
import { DisplacedReceivedAid } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';
import Displaced_Received_Aid_Modal from './displaced-received-aid-modal';
import { DISPLACED_RECEIVED_AIDS_TABS } from '@/@types/actors/common-types/index.type';

interface DisplacedReceivedAidCardProps {
  received_aid: DisplacedReceivedAid;
}

export default function Displaced_Received_Aid_Card({
  received_aid,
}: DisplacedReceivedAidCardProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const isReceived =
    received_aid.tab_type === DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS;

  return (
    <>
      <Card
        radius='md'
        shadow='xs'
        onClick={open}
        className={cn(
          'transition-all duration-150 hover:shadow-md cursor-pointer',
          isReceived ? '!bg-blue-50' : '!bg-red-50'
        )}
      >
        <Group align='center' gap='sm' wrap='nowrap'>
          <ThemeIcon
            size='lg'
            radius='xl'
            variant='light'
            color={isReceived ? 'blue' : 'red'}
          >
            {isReceived ? (
              <CircleCheck size={20} />
            ) : (
              <CalendarClock size={20} />
            )}
          </ThemeIcon>

          <Stack gap={4} w='100%'>
            <Flex
              direction={{ base: 'column', sm: 'row-reverse' }}
              justify='space-between'
              align={{ sm: 'center' }}
              gap='xs'
            >
              <Text fz='xs' c='dimmed'>
                {new Date(received_aid.delivery_date).toLocaleDateString()}
              </Text>
              <Text fw={600} fz='sm' c='dark' className='truncate'>
                {isReceived ? 'لقد استلمت' : 'لديك استلام'}{' '}
                {received_aid.aid_name}
              </Text>
            </Flex>

            <Text fz='xs' c='gray.7' lineClamp={1}>
              {received_aid.aid_content}
            </Text>
          </Stack>
        </Group>
      </Card>

      <Displaced_Received_Aid_Modal
        receivedAid={received_aid}
        opened={opened}
        close={close}
      />
    </>
  );
}
