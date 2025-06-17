'use client';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  sendCallRequest,
  sendCallRequestProps,
} from '@/actions/actors/general/displaced/sendCallRequest';
import { Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
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

const callSchema = z.object({
  dateTime: z.date().refine((date) => dayjs(date).isAfter(dayjs()), {
    message: 'الرجاء اختيار تاريخ ووقت في المستقبل',
  }),
  details: z.string().min(1, 'الرجاء إدخال تفاصيل الاستدعاء'),
});

export type callType = z.infer<typeof callSchema>;

export default function Call_Modal({
  displaced_Id,
  displaced_Ids,
  opened,
  close,
}: Props) {
  const form = useForm<callType>({
    initialValues: {
      dateTime: dayjs().add(1, 'hour').toDate(),
      details: '',
    },
    validate: zodResolver(callSchema),
  });

  const callMutation = useMutation<
    modalActionResponse,
    unknown,
    sendCallRequestProps
  >({
    mutationFn: sendCallRequest,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم الاستدعاء',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        close();
        form.reset();
      } else {
        throw new Error(data.error || 'فشل في استدعاء النازحين');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في استدعاء النازحين';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = (values: callType) => {
    console.log('🚀 ~ handleSubmit ~ values:', values);
    const ids = displaced_Ids || (displaced_Id ? [displaced_Id] : []);
    callMutation.mutate({
      displacedIds: ids,
      dateTime: values.dateTime,
      details: values.details,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={22} fw={600} ta={'center'} className='!text-primary'>
          إضافة تفاصيل الاستدعاء
        </Text>
      }
      classNames={{
        title: '!w-full',
      }}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <DateTimePicker
            label={
              <Text fz={16} fw={600} className='!text-primary'>
                تاريخ و وقت الاستدعاء
              </Text>
            }
            placeholder='تاريخ و وقت الاستدعاء'
            timePickerProps={{
              withDropdown: true,
              popoverProps: { withinPortal: false },
              format: '12h',
            }}
            valueFormat='DD/MM/YYYY - hh:mm A'
            value={form.values.dateTime}
            onChange={(value) =>
              form.setFieldValue('dateTime', new Date(value))
            }
            error={form.errors.dateTime}
          />
          <Textarea
            size='sm'
            label={
              <Text fz={16} fw={600} className='!text-primary'>
                تفاصيل الاستدعاء
              </Text>
            }
            placeholder='أدخل التفاصيل'
            minRows={2}
            maxRows={6}
            autosize
            {...form.getInputProps('details')}
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
              loading={callMutation.isPending}
            >
              تأكيد
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
