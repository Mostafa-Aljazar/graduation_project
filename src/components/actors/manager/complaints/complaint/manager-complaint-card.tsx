'use client';
import { Box, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { cn } from '@/utils/cn';
import { ManagerComplaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { DELEGATE, MAN } from '@/assets/actor';
import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import Manager_Delete_Complaint from './manager-delete-complaint';
import Manager_Complaint_Modal from './manager-complaint-modal';
import {
  changeStatusManagerComplaint,
  changeStatusManagerComplaintProps,
} from '@/actions/actors/manager/complaints/changeStatusManagerComplaint';

interface ManagerComplaintCardProps {
  complaint: ManagerComplaint;
}
export default function Manager_Complaint_Card({
  complaint,
}: ManagerComplaintCardProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const changeStatusMutation = useMutation<
    modalActionResponse,
    unknown,
    changeStatusManagerComplaintProps
  >({
    mutationFn: changeStatusManagerComplaint,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تمت العملية بنجاح',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        queryClient.invalidateQueries({ queryKey: ['complaints'] }); // Refresh complaints list
      } else {
        throw new Error(data.error || 'فشل في تغيير حالة الشكوى');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في تغيير حالة الشكوى';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    //hint: TO PREVENT OPEN delete MODAL
    const path = e.nativeEvent.composedPath() as HTMLElement[];
    const clickedOnDelete = path.some((el) => {
      const attr = (el as HTMLElement)?.getAttribute?.('data-click');
      const classes = (el as HTMLElement)?.classList?.toString() || '';
      return attr === 'delete' || classes.includes('delete');
    });

    if (!clickedOnDelete) {
      if (complaint.status == COMPLAINTS_STATUS.PENDING) {
        changeStatusMutation.mutate({ complaint_Id: complaint.id });
      }
      open();
    }
  };

  return (
    <>
      <Card
        key={complaint.id}
        p='xs'
        radius='md'
        className={cn(
          '!border-1 !border-gray-200 cursor-pointer',
          complaint.status === COMPLAINTS_STATUS.READ
            ? '!bg-second-light'
            : '!bg-red-200'
        )}
        onClick={handleClick}
      >
        <Group>
          <Box
            className='bg-primary !border-1 !border-gray-300 !rounded-full !overflow-hidden'
            w={60}
            h={60}
          >
            <Image
              src={complaint.sender_type === 'DELEGATE' ? DELEGATE : MAN}
              // src={complaint.from.image} //FIXME:
              alt='Profile'
              width={60}
              height={60}
              className='!object-cover'
            />
          </Box>

          <Stack flex={1} gap={0}>
            <Flex
              gap={10}
              direction='row'
              justify={{ base: 'right', md: 'left' }}
            >
              <Text fz='xs' c='dimmed'>
                {complaint.time}
              </Text>
              <Text fz='xs' c='dimmed'>
                {complaint.date}
              </Text>
            </Flex>
            <Text fz='md' fw={600} className='!text-primary'>
              {complaint.sender_type === 'DELEGATE'
                ? 'المندوب : '
                : complaint.sender_type === 'SECURITY'
                ? 'الامن : '
                : complaint.sender_type === 'SECURITY_OFFICER'
                ? 'مسؤول الامن : '
                : 'النازح : '}
              {complaint.from.name}
            </Text>

            <Text fz='md' fw={600} className='!text-dark'>
              العنوان: {complaint.title}
            </Text>
          </Stack>

          <Manager_Delete_Complaint complaint_Id={complaint.id} />
        </Group>
      </Card>
      <Manager_Complaint_Modal
        complaint={complaint}
        opened={opened}
        close={close}
      />
    </>
  );
}
