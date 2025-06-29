'use client';

import { ActionIcon, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { Trash2 } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerDeleteComplaint } from '@/actions/actors/manager/complaints/deleteManagerComplaint';
import { notifications } from '@mantine/notifications';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';

interface ManagerDeleteComplaintProps {
  complaint_Id: number;
}

export default function Manager_Delete_Complaint({
  complaint_Id,
}: ManagerDeleteComplaintProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    ManagerDeleteComplaintProps
  >({
    mutationFn: managerDeleteComplaint,
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
        throw new Error(data.error || 'فشل في الحذف');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في الحذف';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click from bubbling to Card

    deleteMutation.mutate({
      complaint_Id: complaint_Id,
    });
  };

  return (
    <>
      <ActionIcon
        data-click='delete'
        variant='subtle'
        color='red'
        className='!rounded-full'
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          open();
        }}
        aria-label='حذف الشكوى'
      >
        <Trash2 size={18} />
      </ActionIcon>

      <Modal
        data-click='delete'
        opened={opened}
        onClose={close}
        title={
          <Text fz={22} fw={600} ta='center' className='!text-red-500'>
            تأكيد الحذف
          </Text>
        }
        classNames={{
          title: '!w-full',
        }}
        centered
      >
        <Stack>
          <Text fz={18} fw={600}>
            هل أنت متأكد من حذف هذه الشكوى، هذا الإجراء لا يمكن التراجع عنه.
          </Text>

          <Group justify='flex-end'>
            <Button
              data-click='delete'
              type='button'
              variant='outline'
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                close();
              }}
              fw={600}
              className='!border-primary !text-primary'
            >
              إلغاء
            </Button>

            <Button
              data-click='delete'
              type='button'
              className='!bg-red-500'
              loading={deleteMutation.isPending}
              onClick={handleClick}
            >
              حذف
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
