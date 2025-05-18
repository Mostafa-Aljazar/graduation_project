'use client';
import {
  sendUpdateRequest,
  sendUpdateRequestProps,
} from '@/actions/actors/general/displaced/sendUpdateRequest';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { z } from 'zod';

type Props = {
  displaced_Id?: string | number;
  displaced_Ids?: (string | number)[];
  opened: boolean;
  close: () => void;
};

export default function Update_Modal({
  displaced_Id,
  displaced_Ids,
  opened,
  close,
}: Props) {
  const updateMutation = useMutation<
    modalActionResponse,
    unknown,
    sendUpdateRequestProps
  >({
    mutationFn: sendUpdateRequest,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم الارسال',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        close();
      } else {
        throw new Error(data.error || 'فشل في الارسال');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في الارسال';
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
    const ids = displaced_Ids || (displaced_Id ? [displaced_Id] : []);
    updateMutation.mutate({
      displacedIds: ids,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={22} fw={600} ta={'center'} className='!text-primary'>
          تحديث البيانات
        </Text>
      }
      classNames={{
        title: '!w-full',
      }}
      centered
    >
      <Stack>
        <Text fz={18} fw={600}>
          الرجاء التوجه لتحديث البيانات
        </Text>
        <Group justify='flex-end'>
          <Button
            type='button'
            variant='outline'
            onClick={close}
            fw={600}
            className='!border-primary !text-primary'
          >
            إلغاء
          </Button>
          <Button
            type='button'
            className='!bg-primary'
            loading={updateMutation.isPending}
            onClick={handleClick}
          >
            تأكيد
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
