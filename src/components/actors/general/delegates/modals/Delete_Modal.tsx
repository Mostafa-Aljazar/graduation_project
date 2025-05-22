'use client';
import {
  deleteDelegates,
  deleteDelegatesProps,
} from '@/actions/actors/general/delegates/deleteDelegates';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

type Props = {
  delegate_Id?: string | Number;
  delegate_Ids?: (string | Number)[];
  opened: boolean;
  close: () => void;
};

export default function Delete_Modal({
  delegate_Id,
  delegate_Ids,
  opened,
  close,
}: Props) {
  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    deleteDelegatesProps
  >({
    mutationFn: deleteDelegates,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
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
    const ids = delegate_Ids || (delegate_Id ? [delegate_Id] : []);
    deleteMutation.mutate({
      delegatesIds: ids,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close()}
      title={
        <Text fz={22} fw={600} ta={'center'} className='!text-red-500'>
          تأكيد الحذف
        </Text>
      }
      classNames={{
        title: '!w-full',
      }}
      centered
    >
      <Stack>
        {delegate_Id && (
          <Text fz={18} fw={600}>
            هل أنت متأكد من حذف هذا المندوب هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        )}
        {delegate_Ids && (
          <Text fz={18} fw={600}>
            هل أنت متأكد من حذف هؤلاء المناديب؟ هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        )}
        <Text fz={15} fw={600} className='!text-red-500'>
          ملاحظة / سيتم نقل النازحين الخاضة به/بهم إلى المندوب الإفتراضي (بدون
          مندوب).
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
            className='!bg-red-500'
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
