'use client';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  sendDisplacedComplaint,
  sendDisplacedComplaintProps,
} from '@/actions/actors/displaced/complaints/sendDisplacedComplaint';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { MessageSquareDiff, Trash2 } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

const SendComplaintSchema = z.object({
  receiver: z.enum(['DELEGATE', 'MANAGER', 'SECURITY_OFFICER'], {
    message: 'الرجاء اختيار الجهة',
  }),
  title: z.string().min(1, 'الرجاء كتابة عنوان الشكوى'),
  description: z.string().min(5, 'الرجاء كتابة نص الشكوى'),
});

type SendComplaintFormType = z.infer<typeof SendComplaintSchema>;

interface SendDisplacedComplaintProps {
  displaced_ID: number;
}

export default function Send_Displaced_Complaint({
  displaced_ID,
}: SendDisplacedComplaintProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<SendComplaintFormType>({
    initialValues: {
      receiver: 'DELEGATE',
      title: '',
      description: '',
    },
    validate: zodResolver(SendComplaintSchema),
  });

  const sendComplaintMutation = useMutation<
    modalActionResponse,
    unknown,
    sendDisplacedComplaintProps
  >({
    mutationFn: (values) => sendDisplacedComplaint(values),
    onSuccess: (data) => {
      if (data.status === '200') {
        notifications.show({
          title: 'تم الإرسال',
          message: data.message,
          color: 'green',
          position: 'top-left',
        });
        form.reset();
        close();
      } else {
        throw new Error('فشل في إرسال الشكوى');
      }
    },
    onError: () => {
      notifications.show({
        title: 'خطأ',
        message: 'حدث خطأ أثناء الإرسال',
        color: 'red',
        position: 'top-left',
      });
    },
  });

  const handleSubmit = (values: SendComplaintFormType) => {
    sendComplaintMutation.mutate({ ...values, displaced_ID: displaced_ID });
  };

  return (
    <>
      <Button
        className='!bg-primary !rounded-2xl'
        onClick={open}
        aria-label='تقديم شكوى'
        rightSection={<MessageSquareDiff size={16} />}
      >
        تقديم شكوى
      </Button>

      <Modal
        data-click='send-complaint'
        opened={opened}
        onClose={close}
        title={
          <Text fz={18} fw={600} ta='center' className='!text-primary'>
            تقديم شكوى
          </Text>
        }
        classNames={{
          title: '!w-full',
        }}
        centered
        pos={'relative'}
      >
        <LoadingOverlay
          visible={sendComplaintMutation.isPending}
          zIndex={49}
          overlayProps={{ radius: 'sm', blur: 0.3 }}
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={15}>
            <Select
              label={
                <Text fz={16} fw={500}>
                  شكوى إلى:
                </Text>
              }
              placeholder='اختر الجهة'
              classNames={{
                input: 'placeholder:!text-sm !font-normal',
              }}
              size='sm'
              data={[
                { label: 'الإدارة', value: 'MANAGER' },
                { label: 'المندوب', value: 'DELEGATE' },
                { label: 'الامن', value: 'SECURITY_OFFICER' },
              ]}
              //   disabled={isLoading}
              {...form.getInputProps('receiver')}
            />

            <TextInput
              label={
                <Text fz={16} fw={500}>
                  عنوان الشكوى:
                </Text>
              }
              placeholder='اكتب العنوان هنا'
              classNames={{
                input: 'placeholder:!text-sm !font-normal',
              }}
              size='sm'
              {...form.getInputProps('title')}
            />

            <Textarea
              label={
                <Text fz={16} fw={500}>
                  الشكوى
                </Text>
              }
              placeholder='اكتب تفاصيل الشكوى هنا'
              classNames={{
                input: 'placeholder:!text-sm !font-normal',
              }}
              size='sm'
              minRows={4}
              {...form.getInputProps('description')}
            />

            <Group justify='flex-end'>
              <Button
                size='sm'
                data-click='delete'
                type='button'
                variant='outline'
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  form.reset();
                  close();
                }}
                fw={500}
                className='!border-primary !text-primary'
              >
                إلغاء
              </Button>

              <Button
                size='sm'
                data-click='delete'
                type='submit'
                className='!bg-primary'
                // loading={deleteMutation.isPending}
                // onClick={handleClick}
              >
                إرسال
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

{
  /*
    'use client';

import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import React from 'react';

// Mock API actions
async function getComplaintReceivers() {
  return [
    { label: 'الإدارة', value: '1' },
    { label: 'المندوب', value: '2' },
  ];
}

async function sendComplaint(data: ComplaintFormType) {
  return { status: 200, message: 'تم إرسال الشكوى بنجاح' };
}

// Schema
const complaintSchema = z.object({
  receiver: z.string().min(1, 'الرجاء اختيار الجهة'),
  title: z.string().min(1, 'الرجاء كتابة عنوان الشكوى'),
  description: z.string().min(1, 'الرجاء كتابة نص الشكوى'),
});

type ComplaintFormType = z.infer<typeof complaintSchema>;

interface SendComplaintModalProps {
  displaced_ID: number;
  opened: boolean;
  close: () => void;
}

export default function Send_Displaced_Complaint_Modal({
  displaced_ID,
  opened,
  close,
}: SendComplaintModalProps) {
  const form = useForm<ComplaintFormType>({
    initialValues: {
      receiver: '',
      title: '',
      description: '',
    },
    validate: zodResolver(complaintSchema),
  });

  const { data: receivers, isLoading } = useQuery({
    queryKey: ['complaint-receivers'],
    queryFn: getComplaintReceivers,
  });

  const complaintMutation = useMutation({
    mutationFn: (values: ComplaintFormType) =>
      sendComplaint({ ...values, displaced_ID }),
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'تم الإرسال',
          message: data.message,
          color: 'green',
          position: 'top-left',
        });
        form.reset();
        close();
      } else {
        throw new Error('فشل في إرسال الشكوى');
      }
    },
    onError: () => {
      notifications.show({
        title: 'خطأ',
        message: 'حدث خطأ أثناء الإرسال',
        color: 'red',
        position: 'top-left',
      });
    },
  });

  const handleSubmit = (values: ComplaintFormType) => {
    complaintMutation.mutate(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      title={
        <Text fz={18} fw={600} ta='center' className='!text-primary'>
          إرسال شكوى
        </Text>
      }
      classNames={{ title: '!w-full' }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)} dir='rtl'>
        <Stack>
          <Select
            label='شكوى إلى:'
            placeholder='اختر الجهة'
            data={receivers || []}
            disabled={isLoading}
            {...form.getInputProps('receiver')}
          />

          <TextInput
            label='عنوان الشكوى:'
            placeholder='اكتب العنوان هنا'
            {...form.getInputProps('title')}
          />

          <Textarea
            label='الشكوى'
            minRows={5}
            placeholder='اكتب تفاصيل الشكوى هنا'
            {...form.getInputProps('description')}
          />

          <Group justify='center'>
            <Button
              type='submit'
              loading={complaintMutation.isPending}
              className='!bg-primary'
            >
              إرسال
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={close}
              className='!border-primary !text-primary'
            >
              إلغاء
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

    */
}
