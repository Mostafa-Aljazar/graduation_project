'use client';

import {
  Modal,
  Stack,
  Group,
  Text,
  Paper,
  ThemeIcon,
  Textarea,
  Button,
  Divider,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Calendar, Clock, MessageSquareReply, UserCircle } from 'lucide-react';
import { parseAsStringEnum, useQueryStates } from 'nuqs';
import { cn } from '@/utils/cn';
import { Complaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  replyCommonComplaint,
  replyCommonComplaintProps,
} from '@/actions/actors/general/complaints/replyCommonComplaint';
import { COMPLAINTS_TABS } from '@/content/actor/delegate/complaints';
import { USER_TYPE_LABELS } from '@/constants/userTypes';
import { z } from 'zod';

const complaintSchema = z.object({
  reply: z.string().min(3, 'الرجاء إدخال الرد'),
});

type complaintType = z.infer<typeof complaintSchema>;

interface CommonComplaintModalProps {
  complaint: Complaint;
  actor_Id: number;
  role: 'DELEGATE' | 'SECURITY';
  opened: boolean;
  close: () => void;
}

export default function Common_Complaint_Modal({
  complaint,
  actor_Id,
  role,
  opened,
  close,
}: CommonComplaintModalProps) {
  const [query] = useQueryStates({
    'complaints-tab': parseAsStringEnum(
      Object.values(COMPLAINTS_TABS)
    ).withDefault(COMPLAINTS_TABS.RECEIVED_COMPLAINTS),
  });

  const form = useForm<complaintType>({
    initialValues: { reply: '' },
    validate: zodResolver(complaintSchema),
  });

  const replyMutation = useMutation<
    modalActionResponse,
    unknown,
    replyCommonComplaintProps
  >({
    mutationFn: replyCommonComplaint,
    onSuccess: (data) => {
      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم الإرسال',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        close();
        form.reset();
      } else {
        throw new Error(data.error || 'فشل في إرسال الرد');
      }
    },
    onError: (error: any) => {
      notifications.show({
        title: 'خطأ',
        message: error?.message || 'فشل في إرسال الرد',
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = (values: complaintType) => {
    replyMutation.mutate({
      reply: values.reply,
      complaint_Id: complaint.id,
      actor_Id,
      role,
    });
  };

  const isReceived =
    query['complaints-tab'] === COMPLAINTS_TABS.RECEIVED_COMPLAINTS;
  const isSent = query['complaints-tab'] === COMPLAINTS_TABS.SENT_COMPLAINTS;

  return (
    <Modal
      opened={opened}
      onClose={close}
      size='lg'
      centered
      radius='md'
      overlayProps={{ blur: 3 }}
      withCloseButton
      title={
        <Text fz={16} fw={600} ta='center'>
          {complaint.title}
        </Text>
      }
      transitionProps={{ transition: 'fade', duration: 200 }}
      classNames={{ title: '!w-full' }}
    >
      <Stack>
        <Group>
          <Group gap={5}>
            <ThemeIcon size='sm' variant='light' color='green'>
              <UserCircle size={16} />
            </ThemeIcon>
            <Text size='sm' c='dimmed'>
              {isReceived &&
                `من: ${complaint.sender.name} (${
                  USER_TYPE_LABELS[complaint.sender.role]
                })`}
              {isSent &&
                `إلى: ${complaint.receiver.name} (${
                  USER_TYPE_LABELS[complaint.receiver.role]
                })`}
            </Text>
          </Group>

          <Group gap={5}>
            <ThemeIcon size='sm' variant='light' color='yellow'>
              <Calendar size={16} />
            </ThemeIcon>
            <Text size='sm' c='dimmed'>
              {complaint.date} - {complaint.time}
            </Text>
          </Group>
        </Group>

        <Paper p='xs' radius='md' withBorder shadow='xs' bg='gray.0'>
          <Group wrap='nowrap' align='flex-start' gap={6}>
            <ThemeIcon size='sm' variant='light' color='blue'>
              <MessageSquareReply size={16} />
            </ThemeIcon>
            <Text size='sm' fw={500}>
              {complaint.body}
            </Text>
          </Group>
        </Paper>

        {isReceived && (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <Textarea
                size='sm'
                label={
                  <Text size='sm' fw={500} className='!text-primary'>
                    الرد:
                  </Text>
                }
                placeholder='رداً على الشكوى...'
                minRows={3}
                autosize
                {...form.getInputProps('reply')}
                classNames={{
                  input: 'placeholder:!text-sm !text-primary !font-normal',
                }}
              />

              <Group justify='flex-end'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => {
                    form.reset();
                    close();
                  }}
                  className='!border-primary !text-primary'
                >
                  إلغاء
                </Button>
                <Button
                  size='sm'
                  type='submit'
                  disabled={!form.values.reply.trim()}
                  className={cn(
                    'shadow-md',
                    !form.values.reply.trim() ? '!bg-primary/70' : '!bg-primary'
                  )}
                  loading={replyMutation.isPending}
                >
                  تأكيد
                </Button>
              </Group>
            </Stack>
          </form>
        )}

        {isSent && (
          <Group justify='flex-end'>
            <Button
              size='sm'
              variant='outline'
              onClick={close}
              className='!border-red-500 !text-red-500'
            >
              إغلاق
            </Button>
          </Group>
        )}
      </Stack>
    </Modal>
  );
}
