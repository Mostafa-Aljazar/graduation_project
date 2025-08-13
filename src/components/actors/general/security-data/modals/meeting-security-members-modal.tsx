'use client';
import { modalActionResponse } from '@/@types/common/modal/commonActionResponse.type';

import {
  sendSecurityMeetingRequest,
  sendSecurityMeetingRequestProps,
} from '@/actions/actors/general/security-data/sendSecurityMeetingRequest';
import { Button, Group, Modal, Stack, Text, Textarea, Tooltip } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Info } from 'lucide-react';
import { z } from 'zod';

const meetingSchema = z.object({
  dateTime: z.date().refine((date) => dayjs(date).isAfter(dayjs()), {
    message: 'الرجاء اختيار تاريخ ووقت في المستقبل',
  }),
  details: z.string().min(1, 'الرجاء إدخال تفاصيل الاستدعاء'),
});

export type meetingType = z.infer<typeof meetingSchema>;

interface MeetingSecurityModalProps {
  security_Ids: number[];
  opened: boolean;
  close: () => void;
}
export default function Meeting_Security_Members_Modal({
  security_Ids,
  opened,
  close,
}: MeetingSecurityModalProps) {
  const form = useForm<meetingType>({
    initialValues: {
      dateTime: dayjs().add(1, 'hour').toDate(),
      details: '',
    },
    validate: zodResolver(meetingSchema),
  });

  const meetingMutation = useMutation<
    modalActionResponse,
    unknown,
    sendSecurityMeetingRequestProps
  >({
    mutationFn: sendSecurityMeetingRequest,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
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
      security_Ids,
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
            onChange={(value) => form.setFieldValue('dateTime', new Date(value))}
            error={form.errors.dateTime}
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
          />

          <Group gap={6} wrap='nowrap'>
            <Tooltip label='يرجى تحديد موعد دقيق وكتابة تفاصيل واضحة' withArrow position='right'>
              <Info size={18} style={{ cursor: 'help' }} className='!text-primary' />
            </Tooltip>
            <Text fz={14} color='dimmed' fw={500}>
              سيتم إرسال إشعار للأعضاء المحددين.
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
              type='submit'
              className='!bg-primary'
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
