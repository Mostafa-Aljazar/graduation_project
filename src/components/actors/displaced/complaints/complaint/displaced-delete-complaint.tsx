'use client';

import { ActionIcon, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { Trash2 } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerDeleteComplaint } from '@/actions/actors/manager/complaints/deleteManagerComplaint';
import { notifications } from '@mantine/notifications';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { delegateDeleteComplaint } from '@/actions/actors/delegate/complaints/deleteDelegateComplaint';
import {
  deleteDisplacedComplaint,
  DeleteDisplacedComplaintProps,
} from '@/actions/actors/displaced/complaints/deleteDisplacedComplaint';

interface DisplacedDeleteComplaintProps {
  complaint_ID: number;
  displaced_ID: number;
}

export default function Delete_Displaced_Complaint({
  complaint_ID,
  displaced_ID,
}: DisplacedDeleteComplaintProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    DeleteDisplacedComplaintProps
  >({
    mutationFn: deleteDisplacedComplaint,
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
      complaint_ID,
      displaced_ID,
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
          <Text fz={18} fw={600} ta='center' className='!text-red-500'>
            تأكيد الحذف
          </Text>
        }
        classNames={{
          title: '!w-full',
        }}
        centered
      >
        <Stack>
          <Text fz={16} fw={500}>
            هل أنت متأكد من حذف هذه الشكوى، هذا الإجراء لا يمكن التراجع عنه.
          </Text>

          <Group justify='flex-end'>
            <Button
              size='sm'
              data-click='delete'
              type='button'
              variant='outline'
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                close();
              }}
              fw={500}
              className='!border-primary !text-primary'
            >
              إلغاء
            </Button>

            <Button
              size='sm'
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
