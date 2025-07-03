'use client';
import { Complaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  replyDelegateComplaint,
  replyDelegateComplaintProps,
} from '@/actions/actors/delegate/complaints/replyDelegateComplaint';
import { COMPLAINTS_TABS } from '@/content/actor/delegate/complaints';
import { cn } from '@/utils/cn';
import { Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { parseAsStringEnum, useQueryStates } from 'nuqs';
import { z } from 'zod';

const complaintSchema = z.object({
  reply: z.string().min(3, 'الرجاء إدخال الرد'),
});

export type complaintType = z.infer<typeof complaintSchema>;

interface DelegateComplaintModalProps {
  complaint: Complaint;
  opened: boolean;
  close: () => void;
  delegate_ID: number;
}
export default function Delegate_Complaint_Modal({
  complaint,
  opened,
  close,
  delegate_ID,
}: DelegateComplaintModalProps) {
  const [query, setQuery] = useQueryStates({
    'complaints-tab': parseAsStringEnum<COMPLAINTS_TABS>(
      Object.values(COMPLAINTS_TABS)
    ).withDefault(COMPLAINTS_TABS.RECEIVED_COMPLAINTS),
  });
  const form = useForm<complaintType>({
    initialValues: {
      reply: '',
    },
    validate: zodResolver(complaintSchema),
  });

  // FIXME: handel Complaint_Modal
  const replyMutation = useMutation<
    modalActionResponse,
    unknown,
    replyDelegateComplaintProps
  >({
    mutationFn: replyDelegateComplaint,
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
        throw new Error(data.error || 'فشل في ارسال الرد');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في ارسال الرد';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = (values: complaintType) => {
    console.log('🚀 ~ handleSubmit ~ values:', values);
    replyMutation.mutate({
      reply: values.reply,
      complaint_ID: complaint.id,
      delegate_ID: delegate_ID,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close()}
      title={
        <Text fz={18} fw={600} ta={'center'} className='!text-primary'>
          {complaint.title}
        </Text>
      }
      classNames={{
        title: '!w-full',
      }}
      centered
    >
      <Stack gap={10}>
        <Group gap={10} justify='left'>
          <Text fz='xs' c='dimmed'>
            {complaint.time}
          </Text>
          <Text fz='xs' c='dimmed'>
            {complaint.date}
          </Text>
        </Group>

        <Group flex={1} gap={5}>
          <Text fz={16} className='!text-primary'>
            النازح :
          </Text>
          <Text fz={16} className='!text-dark'>
            {complaint.from.name}
          </Text>
        </Group>

        <Group flex={1} gap={5} align='start'>
          <Text fz={16} className='!text-primary'>
            الموضوع :
          </Text>
          <Text flex={1} fz={16} className='!text-dark'>
            {complaint.body}
          </Text>
        </Group>
      </Stack>

      <Group
        justify='left'
        mt={20}
        hidden={query['complaints-tab'] == COMPLAINTS_TABS.RECEIVED_COMPLAINTS}
      >
        <Button
          size='sm'
          type='button'
          variant='outline'
          onClick={close}
          fw={600}
          justify='end'
          className='!self-end !border-red-500 !text-red-500'
          hidden={
            query['complaints-tab'] == COMPLAINTS_TABS.RECEIVED_COMPLAINTS
          }
        >
          إغلاق
        </Button>
      </Group>

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        hidden={query['complaints-tab'] == COMPLAINTS_TABS.SENT_COMPLAINTS}
      >
        <Stack>
          <Textarea
            size='sm'
            label={
              <Text fz={16} className='!text-primary'>
                الرد :
              </Text>
            }
            placeholder='رداً على الشكوى...'
            minRows={2}
            maxRows={6}
            autosize
            fz={16}
            {...form.getInputProps('reply')}
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
              disabled={!form.getValues().reply}
              className={cn(
                '!shadow-lg ',
                !form.getValues().reply ? '!bg-primary/70' : '!bg-primary'
              )}
              loading={replyMutation.isPending}
            >
              تأكيد
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
