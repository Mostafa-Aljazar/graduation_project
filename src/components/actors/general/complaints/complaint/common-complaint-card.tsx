'use client';

import { Box, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { cn } from '@/utils/cn';
import { Complaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modalActionResponse } from '@/@types/common/action/commonActionResponse.type';
import { MAN } from '@/assets/actor';
import { parseAsStringEnum, useQueryStates } from 'nuqs';
import {
  changeStatusCommonComplaint,
  changeStatusCommonComplaintProps,
} from '@/actions/actors/general/complaints/changeStatusCommonComplaint';
import { USER_RANK, USER_RANK_LABELS, USER_TYPE, UserRank, UserType } from '@/constants/userTypes';
import Common_Delete_Complaint from './common-delete-complaint';
import Common_Complaint_Modal from './common-complaint-modal';
import useAuth from '@/hooks/useAuth';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/@types/actors/common-types/index.type';

interface CommonComplaintCardProps {
  complaint: Complaint;
  actor_Id: number;
  role: UserType | UserRank;
}

export default function Common_Complaint_Card({
  complaint,
  actor_Id,
  role,
}: CommonComplaintCardProps) {
  const [query] = useQueryStates({
    'complaints-tab': parseAsStringEnum<COMPLAINTS_TABS>(
      Object.values(COMPLAINTS_TABS)
    ).withDefault(COMPLAINTS_TABS.SENT_COMPLAINTS),
  });

  const { user } = useAuth();

  const isOwner = user?.id === actor_Id && user?.role === role;

  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const changeStatusMutation = useMutation<
    modalActionResponse,
    unknown,
    changeStatusCommonComplaintProps
  >({
    mutationFn: changeStatusCommonComplaint,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تمت العملية بنجاح',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        queryClient.invalidateQueries({ queryKey: ['common-complaints'] });
      } else {
        throw new Error(data.error || 'فشل في تغيير حالة الشكوى');
      }
    },
    onError: (error: any) => {
      notifications.show({
        title: 'خطأ',
        message: error?.message || 'فشل في تغيير حالة الشكوى',
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    const path = e.nativeEvent.composedPath() as HTMLElement[];
    const clickedOnDelete = path.some((el) => {
      const attr = (el as HTMLElement)?.getAttribute?.('data-click');
      const classes = (el as HTMLElement)?.classList?.toString() || '';
      return attr === 'delete' || classes.includes('delete');
    });

    if (!clickedOnDelete) {
      if (
        query['complaints-tab'] === COMPLAINTS_TABS.RECEIVED_COMPLAINTS &&
        complaint.status === COMPLAINTS_STATUS.PENDING &&
        user?.role !== USER_TYPE.DISPLACED
      ) {
        changeStatusMutation.mutate({
          complaint_Id: complaint.id,
          actor_Id,
          role: role as Exclude<UserRank, typeof USER_RANK.SECURITY | typeof USER_RANK.DISPLACED>,
        });
      }
      open();
    }
  };

  return (
    <>
      <Card
        key={complaint.id}
        p='md'
        radius='lg'
        shadow='sm'
        className={cn(
          'hover:shadow-md !border !border-gray-300 transition-all cursor-pointer',
          complaint.status === COMPLAINTS_STATUS.READ ? '!bg-gray-50' : '!bg-red-100'
        )}
        onClick={handleClick}
      >
        <Group align='flex-start' gap='md'>
          <Box
            className='bg-primary border border-gray-300 rounded-full overflow-hidden'
            w={60}
            h={60}
          >
            <Image
              src={MAN.src} //FIXME:
              alt='Profile'
              width={60}
              height={60}
              className='object-cover'
            />
          </Box>

          <Stack flex={1} gap={4}>
            <Flex justify='space-between' wrap='wrap'>
              <Text size='xs' c='dimmed'>
                {/* {complaint.date} - {complaint.time} */}
                {complaint.date}
              </Text>
              <Text size='xs' c='dimmed'>
                الحالة: {complaint.status === COMPLAINTS_STATUS.READ ? 'مقروءة' : 'قيد الانتظار'}
              </Text>
            </Flex>
            <Group flex={1} gap={5}>
              <Text fz={16} className='!text-primary'>
                {query['complaints-tab'] == COMPLAINTS_TABS.RECEIVED_COMPLAINTS &&
                  `من ${USER_RANK_LABELS[complaint.sender.role]}`}
                {query['complaints-tab'] == COMPLAINTS_TABS.SENT_COMPLAINTS &&
                  `الى ${USER_RANK_LABELS[complaint.receiver.role]}`}
                {' :'}
              </Text>
              <Text fz={16} className='!text-dark'>
                {query['complaints-tab'] == COMPLAINTS_TABS.RECEIVED_COMPLAINTS &&
                  complaint.sender.name}
                {query['complaints-tab'] == COMPLAINTS_TABS.SENT_COMPLAINTS &&
                  complaint.receiver.name}
              </Text>
            </Group>

            <Text size='sm' fw={600}>
              العنوان: {complaint.title}
            </Text>
          </Stack>

          {isOwner &&
            (role === USER_TYPE.DISPLACED ||
              query['complaints-tab'] === COMPLAINTS_TABS.SENT_COMPLAINTS) &&
            role !== USER_TYPE.MANAGER && (
              <Common_Delete_Complaint
                complaint_Id={complaint.id}
                actor_Id={actor_Id}
                role={role}
              />
            )}
        </Group>
      </Card>

      <Common_Complaint_Modal
        complaint={complaint}
        actor_Id={actor_Id}
        role={role}
        opened={opened}
        close={close}
      />
    </>
  );
}
