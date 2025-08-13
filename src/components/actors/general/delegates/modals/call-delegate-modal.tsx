'use client';
import { modalActionResponse } from '@/@types/common/modal/commonActionResponse.type';
import {
  sendCallDelegatesRequest,
  sendCallDelegatesRequestProps,
} from '@/actions/actors/general/delegates/sendCallDelegatesRequest';
import { Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { z } from 'zod';

interface CallModalProps {
  delegate_Ids: number[];
  opened: boolean;
  close: () => void;
}

const callSchema = z.object({
  dateTime: z.date().refine((date) => dayjs(date).isAfter(dayjs()), {
    message: 'الرجاء اختيار تاريخ ووقت في المستقبل',
  }),
  details: z.string().min(1, 'الرجاء إدخال تفاصيل الاستدعاء'),
});

export type callType = z.infer<typeof callSchema>;

export default function Call_Delegate_Modal({ delegate_Ids, opened, close }: CallModalProps) {
  const form = useForm<callType>({
    initialValues: {
      dateTime: dayjs().add(1, 'hour').toDate(),
      details: '',
    },
    validate: zodResolver(callSchema),
  });

  const callMutation = useMutation<modalActionResponse, unknown, sendCallDelegatesRequestProps>({
    mutationFn: sendCallDelegatesRequest,
    onSuccess: (data) => {
      if (data.status === 200) {
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
        throw new Error(data.error || 'فشل في استدعاء المناديب');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في استدعاء المناديب';
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
    callMutation.mutate({
      delegate_Ids,
      dateTime: values.dateTime,
      details: values.details,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={18} fw={600} ta={'center'} className='!text-primary'>
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
              <Text fz={16} fw={500} className='!text-primary'>
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
            onChange={(value) => form.setFieldValue('dateTime', new Date(value))}
            error={form.errors.dateTime}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

          <Textarea
            size='sm'
            label={
              <Text fz={16} fw={500} className='!text-primary'>
                تفاصيل الاستدعاء
              </Text>
            }
            placeholder='أدخل التفاصيل'
            minRows={2}
            maxRows={6}
            autosize
            {...form.getInputProps('details')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

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
              type='submit'
              className='!bg-primary !shadow-md'
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
