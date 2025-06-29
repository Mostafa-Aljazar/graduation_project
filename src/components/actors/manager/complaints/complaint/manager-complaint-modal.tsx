'use client';
import { ManagerComplaint } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  replyManagerComplaint,
  replyManagerComplaintProps,
} from '@/actions/actors/manager/complaints/replyManagerComplaint';
import { cn } from '@/utils/cn';
import { Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

const complaintSchema = z.object({
  reply: z.string().min(3, 'الرجاء إدخال الرد'),
});

export type complaintType = z.infer<typeof complaintSchema>;

interface ManagerComplaintModalProps {
  complaint: ManagerComplaint;
  opened: boolean;
  close: () => void;
}
export default function Manager_Complaint_Modal({
  complaint,
  opened,
  close,
}: ManagerComplaintModalProps) {
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
    replyManagerComplaintProps
  >({
    mutationFn: replyManagerComplaint,
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
      complaint_Id: complaint.id,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close()}
      title={
        <Text fz={22} fw={600} ta={'center'} className='!text-primary'>
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
          <Text fz={18} className='!text-primary'>
            {complaint.sender_type === 'DELEGATE'
              ? 'المندوب : '
              : complaint.sender_type === 'SECURITY'
              ? 'الامن : '
              : complaint.sender_type === 'SECURITY_OFFICER'
              ? 'مسؤول الامن : '
              : 'النازح : '}
          </Text>
          <Text fz={18} className='!text-dark'>
            {complaint.from.name}
          </Text>
        </Group>

        <Group flex={1} gap={5} align='start'>
          <Text fz={18} className='!text-primary'>
            الموضوع :
          </Text>
          <Text flex={1} fz={18} className='!text-dark'>
            {complaint.body}
          </Text>
        </Group>
      </Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Textarea
            size='sm'
            label={
              <Text fz={18} className='!text-primary'>
                الرد :
              </Text>
            }
            placeholder='رداً على الشكوى...'
            minRows={2}
            maxRows={6}
            autosize
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
