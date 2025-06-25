'use client';

import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { deleteAd } from '@/actions/actors/manager/blog-stories-ads/ad/deleteAd';
import { deleteArticle } from '@/actions/actors/manager/blog-stories-ads/blog/deleteArticle';
import { deleteSuccessStory } from '@/actions/actors/manager/blog-stories-ads/success-stories/deleteSuccessStory';
import { TYPE_CONTENT } from '@/content/actor/manager/ads-blogs-stories';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  id: string | number;
  destination?: TYPE_CONTENT;
  opened: boolean;
  close: () => void;
};
export default function Delete_Ad_Article_Story_Modal({
  id,
  destination,
  opened,
  close,
}: Props) {
  const isInSuccessStories = destination === TYPE_CONTENT.SUCCESS_STORIES;
  const isInAds = destination === TYPE_CONTENT.ADS;

  const queryClient = useQueryClient();
  const deleteMutation = useMutation<
    modalActionResponse,
    unknown,
    { id: string | number }
  >({
    mutationFn: async ({ id }) => {
      if (isInAds) {
        return await deleteAd({ adId: id });
      } else if (isInSuccessStories) {
        return await deleteSuccessStory({ successStoryId: Number(id) });
      } else {
        return await deleteArticle({ articleId: Number(id) });
      }
    },
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
        // Invalidate and refetch the relevant query based on destination
        const queryKey = isInAds
          ? ['ads']
          : isInSuccessStories
          ? ['successStories']
          : ['blogs'];
        queryClient.invalidateQueries({ queryKey });
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
      id,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close()}
      title={
        <Text fz={20} fw={500} ta={'center'} className='!text-red-500'>
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
          هل أنت متأكد من حذف هذا العنصر؟ هذا الإجراء لا يمكن التراجع عنه.
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
