'use client';

import {
  Modal,
  Text,
  Group,
  Stack,
  Divider,
  ThemeIcon,
  Box,
  Badge,
  Grid,
  Paper,
} from '@mantine/core';
import {
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  MapPin,
  UserRoundCheck,
  Tags,
  Package,
} from 'lucide-react';
import { DisplacedReceivedAid } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';
import { DISPLACED_RECEIVED_AIDS_TABS } from '@/@types/actors/common-types/index.type';
import { USER_TYPE } from '@/constants/userTypes';
import {
  GET_AIDS_TYPE_ICONS,
  TYPE_AIDS,
  TYPE_AIDS_LABELS,
} from '@/content/actor/manager/aids-management';
import React from 'react';

const getAidTypeIcon = (type: TYPE_AIDS) => {
  const IconComponent = GET_AIDS_TYPE_ICONS[type] || Package;
  return <IconComponent size={16} />;
};

interface DisplacedReceivedAidModalProps {
  receivedAid: DisplacedReceivedAid;
  opened: boolean;
  close: () => void;
}

export default function Displaced_Received_Aid_Modal({
  receivedAid,
  opened,
  close,
}: DisplacedReceivedAidModalProps) {
  const isReceived =
    receivedAid.tab_type === DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS;

  return (
    <Modal
      opened={opened}
      onClose={close}
      size='lg'
      radius='md'
      withCloseButton
      title={
        <Text fz={18} fw={600} ta={'center'} className='!text-primary'>
          تفاصيل المساعدة
        </Text>
      }
      classNames={{
        title: '!w-full',
      }}
      centered
    >
      <Stack gap='md'>
        <Group mb='xs'>
          <Badge
            color={isReceived ? 'green' : 'blue'}
            variant='light'
            size='lg'
            radius='sm'
          >
            {isReceived ? 'مساعدة مستلمة' : 'مساعدة مقدّمة'}
          </Badge>
        </Group>

        <Divider />

        <Grid gutter='sm'>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='indigo' size='sm'>
                  <ClipboardList size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    اسم المساعدة
                  </Text>
                  <Text size='sm'>{receivedAid.aid_name}</Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='grape' size='sm'>
                  {getAidTypeIcon(receivedAid.aid_type as TYPE_AIDS)}
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    نوع المساعدة
                  </Text>
                  <Group>
                    <Text size='sm'>
                      {TYPE_AIDS_LABELS[receivedAid.aid_type]}
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='cyan' size='sm'>
                  <MapPin size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    مكان التسليم
                  </Text>
                  <Text size='sm'>{receivedAid.delivery_location}</Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: isReceived ? 6 : 12 }}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='teal' size='sm'>
                  <CalendarClock size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    تاريخ التسليم
                  </Text>
                  <Text size='sm'>
                    {new Date(receivedAid.delivery_date).toLocaleDateString()}
                  </Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          {isReceived && receivedAid.receipt_date && (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper withBorder radius='md' p='sm' bg='gray.0'>
                <Group gap='xs' align='start'>
                  <ThemeIcon variant='light' color='green' size='sm'>
                    <CalendarCheck size={18} />
                  </ThemeIcon>
                  <Stack gap={2}>
                    <Text size='xs' c='dimmed'>
                      تاريخ الاستلام
                    </Text>
                    <Text size='sm'>
                      {new Date(receivedAid.receipt_date).toLocaleDateString()}
                    </Text>
                  </Stack>
                </Group>
              </Paper>
            </Grid.Col>
          )}

          <Grid.Col span={12}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='orange' size='sm'>
                  <UserRoundCheck size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    مقدم المساعدة
                  </Text>
                  <Text size='sm'>
                    {receivedAid.aid_giver.name} (
                    {receivedAid.aid_giver.role === USER_TYPE.DELEGATE
                      ? 'مندوب'
                      : 'مدير'}
                    )
                  </Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Stack gap={4}>
                <Text size='xs' fw={600}>
                  وصف المساعدة
                </Text>
                <Text size='sm' c='dimmed'>
                  {receivedAid.aid_content}
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
}
