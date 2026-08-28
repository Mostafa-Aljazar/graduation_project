'use client';
import { commonActionResponse } from '@/@types/common/action/commonActionResponse.type';
import {
  sendMeetingRequest,
  sendMeetingRequestProps,
} from '@/actions/actors/general/displaceds/sendMeetingRequest';
import { Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { zodResolver } from '@/lib/zod-resolver';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { z } from 'zod';

const meetingSchema = z.object({
  dateTime: z.date().refine((date) => dayjs(date).isAfter(dayjs()), {
    message: 'الرجاء اختيار تاريخ ووقت في المستقبل',
  }),
  details: z.string().min(1, 'الرجاء إدخال تفاصيل الاستدعاء'),
});

export type meetingType = z.infer<typeof meetingSchema>;

interface MeetingModalProps {
  displaced_Ids: number[];
  opened: boolean;
  close: () => void;
}
export default function Meeting_Displaced_Modal({
  displaced_Ids,
  opened,
  close,
}: MeetingModalProps) {
  const form = useForm<meetingType>({
    initialValues: {
      dateTime: dayjs().add(1, 'hour').toDate(),
      details: '',
    },
    validate: zodResolver(meetingSchema),
  });

  const meetingMutation = useMutation<commonActionResponse, unknown, sendMeetingRequestProps>({
    mutationFn: sendMeetingRequest,
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'تم الارسال',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        close();
        form.reset();
      } else {
        throw new Error(data.error || 'فشل في ارسال طلب الاجتماع');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في ارسال طلب الاجتماع';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = (values: meetingType) => {
    console.log('🚀 ~ handleSubmit ~ values:', values);
    meetingMutation.mutate({
      displaced_Ids,
      dateTime: values.dateTime,
      details: values.details,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close()}
      title={
        <Text fz={18} fw={600} ta={'center'} className='!text-primary'>
          تأكيد الاجتماع
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
                موعد الاجتماع
              </Text>
            }
            placeholder='تاريخ و وقت الاجتماع'
            timePickerProps={{
              withDropdown: true,
              popoverProps: { withinPortal: false },
              format: '12h',
            }}
            // valueFormat=' MMM DD YYYY - hh:mm A '
            // defaultValue={dayjs().format('MMM DD YYYY ')}
            valueFormat='DD/MM/YYYY - hh:mm A'
            value={form.values.dateTime}
            onChange={(value) =>
              form.setFieldValue('dateTime', value ? new Date(value) : form.values.dateTime)
            }
            error={form.errors.dateTime}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />
          <Textarea
            size='sm'
            label={
              <Text fz={16} fw={500} className='!text-primary'>
                تفاصيل الاجتماع
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
              className='!shadow-md !border-primary !text-primary'
            >
              إلغاء
            </Button>
            <Button
              size='sm'
              type='submit'
              className='!bg-primary !shadow-md'
              loading={meetingMutation.isPending}
            >
              تأكيد
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
