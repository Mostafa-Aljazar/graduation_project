'use client';

import { changeDelegate } from '@/actions/actors/general/displaced/changeDelegate';
import { Button, Group, Modal, Select, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { z } from 'zod';

// TODO: handel fetching it
const All_Delegates = [
  { value: '1', label: 'فيصل محمد سليمان ابو زكري' },
  { value: '2', label: 'معتز' },
  { value: '3', label: 'علي' },
  { value: '4', label: 'أحمد' },
];

type Props = {
  displaced_Id?: string | number;
  displaced_Ids?: (string | number)[];
  opened: boolean;
  close: () => void;
};

const changeDelegateSchema = z.object({
  delegateId: z.string().min(1, 'الرجاء اختيار مندوب'),
});

export type changeDelegateType = z.infer<typeof changeDelegateSchema>;

export default function Change_Delegate_Modal({
  displaced_Id,
  displaced_Ids,
  opened,
  close,
}: Props) {
  const form = useForm<changeDelegateType>({
    initialValues: {
      delegateId: '',
    },
    validate: zodResolver(changeDelegateSchema),
  });

  const changeMutation = useMutation<
    modalActionResponse,
    unknown,
    { displacedIds: (string | number)[]; delegateId: string }
  >({
    mutationFn: changeDelegate,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم التغيير',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        close();
        form.reset();
      } else {
        throw new Error(data.error || 'فشل في تغيير المندوب');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في تغيير المندوب';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = (values: changeDelegateType) => {
    const ids = displaced_Ids || (displaced_Id ? [displaced_Id] : []);
    changeMutation.mutate({
      displacedIds: ids,
      delegateId: values.delegateId,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={22} fw={600} ta='center' className='!text-primary'>
          تغيير المندوب
        </Text>
      }
      classNames={{ title: '!w-full' }}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            label={
              <Text fz={18} fw={600}>
                المندوب :
              </Text>
            }
            placeholder='اختر المندوب'
            data={All_Delegates}
            size='sm'
            w='100%'
            classNames={{
              input: '!text-primary !font-medium',
            }}
            {...form.getInputProps('delegateId')}
          />

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
              type='submit'
              className='!bg-primary'
              loading={changeMutation.isPending}
            >
              تأكيد
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
