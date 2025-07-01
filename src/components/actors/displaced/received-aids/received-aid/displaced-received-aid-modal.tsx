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
} from 'lucide-react';
import { DisplacedReceivedAid } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';
import { DISPLACED_RECEIVED_AIDS_TABS } from '@/content/actor/displaced/received-aid';

interface Props {
  receivedAid: DisplacedReceivedAid;
  opened: boolean;
  close: () => void;
}

export default function Displaced_Received_Aid_Modal({
  receivedAid,
  opened,
  close,
}: Props) {
  const isReceived =
    receivedAid.tabType === DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS;

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
                  <Text size='sm'>{receivedAid.aidName}</Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='grape' size='sm'>
                  <Tags size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    نوع المساعدة
                  </Text>
                  <Text size='sm'>{receivedAid.aidType}</Text>
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
                  <Text size='sm'>{receivedAid.deliveryLocation}</Text>
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
                    {new Date(receivedAid.deliveryDate).toLocaleDateString()}
                  </Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          {isReceived && receivedAid.receiptDate && (
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
                      {new Date(receivedAid.receiptDate).toLocaleDateString()}
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
                    {receivedAid.aidGiver.name} (
                    {receivedAid.aidGiver.role === 'DELEGATE'
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
                  {receivedAid.aidContent}
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
}
