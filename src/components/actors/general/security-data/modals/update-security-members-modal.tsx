'use client';

import { modalActionResponse } from '@/@types/common/modal/commonActionResponse.type';
import {
  sendSecurityUpdateRequest,
  sendSecurityUpdateRequestProps,
} from '@/actions/actors/general/security-data/sendSecurityUpdateRequest';

import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

interface UpdateSecurityModalProps {
  security_Ids: number[];
  opened: boolean;
  close: () => void;
}

export default function Update_Security_Members_Modal({
  security_Ids,
  opened,
  close,
}: UpdateSecurityModalProps) {
  const mutation = useMutation<modalActionResponse, unknown, sendSecurityUpdateRequestProps>({
    mutationFn: sendSecurityUpdateRequest,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم الإرسال',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        close();
      } else {
        throw new Error(data.error || 'فشل في إرسال الطلب');
      }
    },
    onError: (error: any) => {
      const message = error?.message || 'فشل في إرسال الطلب';
      notifications.show({
        title: 'خطأ',
        message,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleClick = () => {
    mutation.mutate({ security_Ids });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={18} fw={600} ta='center' className='!text-primary'>
          تحديث البيانات
        </Text>
      }
      classNames={{ title: '!w-full' }}
      centered
    >
      <Stack>
        <Text fz={16} fw={600} mt='xs'>
          الرجاء التوجه لتحديث البيانات
        </Text>
        <Group justify='flex-end'>
          <Button
            size='sm'
            type='button'
            variant='outline'
            onClick={close}
            fw={600}
            className='!border-primary !text-primary'
          >
            إلغاء
          </Button>
          <Button
            size='sm'
            type='button'
            className='!bg-primary'
            loading={mutation.isPending}
            onClick={handleClick}
          >
            تأكيد
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
