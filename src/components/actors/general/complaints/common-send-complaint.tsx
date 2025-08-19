'use client';

import { commonActionResponse } from '@/@types/common/action/commonActionResponse.type';
import {
  sendCommonComplaint,
  sendCommonComplaintProps,
} from '@/actions/actors/general/complaints/sendCommonComplaint';
import { USER_RANK, USER_RANK_LABELS, USER_TYPE, UserRank, UserType } from '@/constants/userTypes';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/cn';
import {
  commonSendComplaintFormSchema,
  commonSendComplaintFormValues,
} from '@/validation/actor/general/complaints/sendComplaintFormSchema';
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
import { MessageSquareDiff, Send, X } from 'lucide-react';

const ALLOWED_RECEPTIONS: Record<UserRank, UserRank[]> = {
  DISPLACED: [USER_TYPE.MANAGER, USER_TYPE.DELEGATE, USER_RANK.SECURITY_OFFICER],
  DELEGATE: [USER_TYPE.MANAGER, USER_RANK.SECURITY_OFFICER],
  SECURITY: [USER_TYPE.MANAGER, USER_RANK.SECURITY_OFFICER],
  SECURITY_OFFICER: [USER_TYPE.MANAGER],
  MANAGER: [],
};

export default function Common_Send_Complaint() {
  const { user } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);

  const allowedReceptions = (user?.role && ALLOWED_RECEPTIONS[user.role as UserType]) || [];

  const dynamicReceptionOptions = allowedReceptions.map((value) => ({
    value: value as UserRank,
    label: USER_RANK_LABELS[value as UserRank],
  }));

  const formSchema = commonSendComplaintFormSchema.refine(
    (data) => allowedReceptions.includes(data.reception),
    {
      path: ['reception'],
      message: 'جهة الاستقبال غير صالحة لهذا الدور',
    }
  );

  const form = useForm<commonSendComplaintFormValues>({
    initialValues: {
      reception: '' as any,
      title: '',
      content: '',
    },
    validate: zodResolver(formSchema),
  });

  const sendCommonComplaintMutation = useMutation<
    commonActionResponse,
    unknown,
    sendCommonComplaintProps
  >({
    mutationFn: sendCommonComplaint,
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'تمت العملية بنجاح',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        close();
        form.reset();
      } else {
        throw new Error(data.error || 'فشل في إرسال الشكوى');
      }
    },
    onError: (error: any) => {
      notifications.show({
        title: 'خطأ',
        message: error?.message || 'فشل في إرسال الشكوى',
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = (values: commonSendComplaintFormValues) => {
    if (!user?.id || !user?.role) return;

    sendCommonComplaintMutation.mutate({
      actor_Id: user.id,
      role: (user.role == USER_TYPE.SECURITY
        ? user.rank
        : user.role) as sendCommonComplaintProps['role'],
      reception: values.reception,
      title: values.title,
      content: values.content,
    });
  };

  const disabled = sendCommonComplaintMutation.isPending || allowedReceptions.length === 0;

  return (
    <>
      <Button
        type='button'
        size='sm'
        radius='md'
        onClick={open}
        rightSection={<MessageSquareDiff size={16} />}
        className='!bg-primary shadow-md font-semibold text-white'
        disabled={disabled}
      >
        تقديم شكوى
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title={
          <Text size='lg' fw={600} ta='center' className='text-primary'>
            إرسال شكوى جديدة
          </Text>
        }
        centered
        size='lg'
        radius='md'
        overlayProps={{ blur: 2, backgroundOpacity: 0.55 }}
        classNames={{ title: '!w-full' }}
        pos={'relative'}
      >
        <LoadingOverlay
          visible={sendCommonComplaintMutation.isPending}
          zIndex={49}
          overlayProps={{ radius: 'sm', blur: 0.3 }}
        />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap='md' mt='xs'>
            <Select
              label='شكوى إلى'
              placeholder='اختر الجهة المستقبلة...'
              data={dynamicReceptionOptions}
              size='sm'
              radius='md'
              withAsterisk
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('reception')}
              disabled={disabled}
            />

            <TextInput
              label='عنوان الشكوى'
              placeholder='أدخل عنوان الشكوى...'
              size='sm'
              radius='md'
              withAsterisk
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('title')}
              disabled={disabled}
            />

            <Textarea
              label='محتوى الشكوى'
              placeholder='اكتب تفاصيل الشكوى هنا...'
              autosize
              minRows={4}
              maxRows={8}
              size='sm'
              radius='md'
              withAsterisk
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('content')}
              disabled={disabled}
            />

            <Group justify='flex-end' mt='xs'>
              <Button
                variant='outline'
                color='red'
                size='sm'
                radius='md'
                rightSection={<X size={14} />}
                onClick={() => {
                  close();
                  form.reset();
                }}
                disabled={sendCommonComplaintMutation.isPending}
              >
                إلغاء
              </Button>

              <Button
                size='sm'
                type='submit'
                radius='md'
                rightSection={<Send size={14} />}
                className={cn(
                  'shadow-lg text-white',
                  !form.isValid() ? '!bg-primary/70' : '!bg-primary'
                )}
                disabled={!form.isValid() || disabled}
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
