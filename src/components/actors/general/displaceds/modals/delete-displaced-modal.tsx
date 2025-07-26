'use client';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  deleteDisplaced,
  deleteDisplacedsProps,
} from '@/actions/actors/general/displaceds/deleteDisplaced';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

interface DeleteModalProps {
  displaced_Ids: number[];
  opened: boolean;
  close: () => void;
}

export default function Delete_Displaced_Modal({
  displaced_Ids,
  opened,
  close,
}: DeleteModalProps) {
  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    deleteDisplacedsProps
  >({
    mutationFn: deleteDisplaced,
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'تمت العملية بنجاح',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
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

  const handleClick = () => {
    deleteMutation.mutate({
      displaced_Ids,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close()}
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
        {displaced_Ids?.length == 1 && (
          <Text fz={16} fw={500}>
            هل أنت متأكد من حذف هذا النازح؟ هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        )}
        {displaced_Ids?.length > 1 && (
          <Text fz={16} fw={500}>
            هل أنت متأكد من حذف هؤلاء النازحين؟ هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        )}
        <Group justify='flex-end'>
          <Button
            size='sm'
            type='button'
            variant='outline'
            onClick={close}
            fw={600}
            className='!shadow-md !border-primary !text-primary'
          >
            إلغاء
          </Button>
          <Button
            size='sm'
            type='button'
            className='!bg-red-500 !shadow-md'
            loading={deleteMutation.isPending}
            onClick={handleClick}
          >
            حذف
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
