'use client';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  deleteDelegates,
  deleteDelegatesProps,
} from '@/actions/actors/general/delegates/deleteDelegates';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

interface DeleteModalProps {
  delegate_Ids: Number[];
  opened: boolean;
  close: () => void;
}

export default function Delete_Delegate_Modal({
  delegate_Ids,
  opened,
  close,
}: DeleteModalProps) {
  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    deleteDelegatesProps
  >({
    mutationFn: deleteDelegates,
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
      delegate_Ids,
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
        {delegate_Ids.length == 1 && (
          <Text fz={16} fw={500}>
            هل أنت متأكد من حذف هذا المندوب هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        )}
        {delegate_Ids.length > 1 && (
          <Text fz={16} fw={500}>
            هل أنت متأكد من حذف هؤلاء المناديب؟ هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        )}
        <Text fz={16} fw={500} className='!text-red-500'>
          ملاحظة / سيتم نقل النازحين الخاضة به/بهم إلى المندوب الإفتراضي (بدون
          مندوب).
        </Text>
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
