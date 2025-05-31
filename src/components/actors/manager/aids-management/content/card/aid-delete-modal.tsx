'use client';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  deleteDisplaced,
  deleteDisplacedsProps,
} from '@/actions/actors/general/displaced/deleteDisplaced';
import {
  deleteAid,
  deleteAidProps,
} from '@/actions/actors/manager/aids-management/deleteAid';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

type Props = {
  aid_id?: string | number;
  opened: boolean;
  close: () => void;
};

export default function Aid_Delete_Modal({ aid_id, opened, close }: Props) {
  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    deleteAidProps
  >({
    mutationFn: deleteAid,
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
    deleteMutation.mutate({
      aid_Id: aid_id as string | number,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close()}
      title={
        <Text fz={20} fw={600} ta={'center'} className='!text-red-500'>
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
          هل أنت متأكد من حذف هذه المساعدة؟ هذا الإجراء لا يمكن التراجع عنه.
        </Text>

        <Group justify='flex-end'>
          <Button
            type='button'
            variant='outline'
            onClick={close}
            fw={500}
            className='!border-primary !text-primary'
          >
            إلغاء
          </Button>
          <Button
            type='button'
            fw={500}
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
