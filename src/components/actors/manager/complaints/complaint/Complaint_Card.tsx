'use client';
import { Box, Card, Flex, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { cn } from '@/utils/cn';
import { Complaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { delegate, man } from '@/assets/common';
import Delete_Complaint from './Delete_Complaint';
import Complaint_Modal from './Complaint_Modal';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeStatusComplaint } from '@/actions/actors/manager/complaints/changeStatusComplaint';

type Props = {
  complaint: Complaint;
};
export default function Complaint_Card({ complaint }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const changeStatusMutation = useMutation<
    modalActionResponse,
    unknown,
    changeStatusComplaint
  >({
    mutationFn: changeStatusComplaint,
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
        close();
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
      open();
      if (complaint.status == 'pending') {
        changeStatusMutation.mutate({ complaint_Id: complaint.id });
      }
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
          complaint.status === 'read' ? '!bg-second-light' : '!bg-red-200'
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
              src={complaint.sender_type === 'DELEGATE' ? delegate : man}
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
              {complaint.from}
            </Text>

            <Text fz='md' fw={600} className='!text-dark'>
              العنوان: {complaint.title}
            </Text>
          </Stack>

          <Delete_Complaint complaint_Id={complaint.id} />
        </Group>
      </Card>
      <Complaint_Modal complaint={complaint} opened={opened} close={close} />
    </>
  );
}
