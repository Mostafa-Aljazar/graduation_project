'use client';

import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  deleteSecurityMembers,
  deleteSecurityMembersProps,
} from '@/actions/actors/general/security-data/deleteSecurityMembers';

import { Button, Group, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Info } from 'lucide-react';

interface DeleteSecurityModalProps {
  security_Ids: number[];
  opened: boolean;
  close: () => void;
}

export default function Delete_Security_Members_Modal({
  security_Ids,
  opened,
  close,
}: DeleteSecurityModalProps) {
  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    deleteSecurityMembersProps
  >({
    mutationFn: deleteSecurityMembers,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم الحذف',
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
    deleteMutation.mutate({ security_Ids });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={18} fw={600} ta='center' className='!text-red-500'>
          تأكيد الحذف
        </Text>
      }
      classNames={{ title: '!w-full' }}
      centered
    >
      <Stack>
        <Text fz={16} fw={600} mt='xs'>
          {security_Ids.length === 1
            ? 'هل أنت متأكد من حذف هذا العنصر؟'
            : `هل أنت متأكد من حذف ${security_Ids.length} عناصر؟`}
        </Text>

        <Group gap={6} wrap='nowrap'>
          <Tooltip
            label='لا يمكن التراجع عن حذف العناصر بعد تأكيد العملية'
            withArrow
            position='right'
          >
            <Info
              size={18}
              style={{ cursor: 'help' }}
              className='!text-red-500'
            />
          </Tooltip>
          <Text fz={14} fw={600} className='!text-red-500'>
            هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        </Group>

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
