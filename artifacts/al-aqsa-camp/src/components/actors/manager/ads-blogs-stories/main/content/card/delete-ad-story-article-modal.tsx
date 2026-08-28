'use client';

import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { commonActionResponse } from '@/@types/common/action/commonActionResponse.type';
import {
  deleteAdBlogStory,
  deleteAdBlogStoryProps,
} from '@/actions/actors/manager/blog-stories-ads/deleteAdBlogStory';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteAdBlogStoryModalProps {
  id: number;
  type: TYPE_WRITTEN_CONTENT;
  opened: boolean;
  close: () => void;
  manager_Id: number;
}

export default function Delete_Ad_Article_Story_Modal({
  id,
  type,
  opened,
  close,
  manager_Id,
}: DeleteAdBlogStoryModalProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<commonActionResponse, unknown, deleteAdBlogStoryProps>({
    mutationFn: deleteAdBlogStory,
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
        queryClient.invalidateQueries({ queryKey: ['Ads_Blogs_Stories'] });
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
      content_Id: id,
      manager_Id: manager_Id,
      type: type,
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
        <Text fz={16} fw={500}>
          هل أنت متأكد من حذف هذا المحتوى ؟ هذا الإجراء لا يمكن التراجع عنه.
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
