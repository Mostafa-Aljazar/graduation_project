'use client';

import { modalActionResponse } from '@/@types/common/modal/commonActionResponse.type';
import { getDelegates } from '@/actions/actors/general/delegates/getDelegates';
import {
  changeDelegate,
  changeDelegateProps,
} from '@/actions/actors/general/displaceds/changeDelegate';
import { Button, Group, Modal, Select, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { z } from 'zod';

const changeDelegateSchema = z.object({
  delegateId: z.string().min(1, 'الرجاء اختيار مندوب'),
});

export type changeDelegateType = z.infer<typeof changeDelegateSchema>;

interface ChangeDelegateModalProps {
  displaced_Ids: number[];
  opened: boolean;
  close: () => void;
}

export default function Change_Delegate_In_Displaced_Modal({
  displaced_Ids,
  opened,
  close,
}: ChangeDelegateModalProps) {
  const form = useForm<changeDelegateType>({
    initialValues: {
      delegateId: '',
    },
    validate: zodResolver(changeDelegateSchema),
  });

  // Fetch delegates using useQuery
  const {
    data: delegatesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['delegates'],
    queryFn: () => getDelegates({ limit: -1 }), //-1 =>  get All
    select: (data) =>
      data.delegates.map((delegate) => ({
        value: delegate.id.toString(),
        label: delegate.name,
      })),
  });

  const changeMutation = useMutation<modalActionResponse, unknown, changeDelegateProps>({
    mutationFn: changeDelegate,
    onSuccess: (data) => {
      if (data.status === 200) {
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
    changeMutation.mutate({
      displaced_Ids,
      delegateId: Number(values.delegateId),
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={18} fw={600} ta='center' className='!text-primary'>
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
              <Text fz={16} fw={500}>
                المندوب :
              </Text>
            }
            placeholder='اختر المندوب'
            data={delegatesData || []} // Use fetched delegates or empty array            size='sm'
            w='100%'
            classNames={{
              input: '!text-primary !font-medium',
            }}
            disabled={isLoading || !!error} // Disable while loading or on error
            error={error ? 'فشل في جلب قائمة المناديب' : undefined}
            {...form.getInputProps('delegateId')}
          />

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
              type='submit'
              className='!bg-primary !shadow-md'
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
