'use client';
import { USER_TYPE } from '@/constants/userTypes';
import { cn } from '@/utils/cn';
import {
  delegateSendComplaintFormSchema,
  delegateSendComplaintFormValues,
} from '@/validation/actor/delegate/complaints/sendComplaintFormSchema';
import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MessageSquareDiff, Send } from 'lucide-react';

export default function Send_Complaint() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<delegateSendComplaintFormValues>({
    initialValues: {
      reception: USER_TYPE.MANAGER, // Default to MANAGER
      title: '',
      content: '',
    },
    validate: zodResolver(delegateSendComplaintFormSchema),
  });

  // TODO: handel send Complaint
  const handleSubmit = (values: delegateSendComplaintFormValues) => {
    console.log('🚀 ~ Send_Complaint ~ values:', values);
    close(); // Close modal after successful submission
    form.reset(); // Reset form to initial values after submission
  };

  return (
    <>
      <Button
        type='button'
        variant='light'
        size='sm'
        className='!bg-primary disabled:!bg-primary/75 shadow-xl !text-white'
        onClick={open}
        fw={500}
        fz={16}
        rightSection={<MessageSquareDiff size={16} />}
      >
        تقديم شكوى
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset(); // Reset form when modal is closed
        }}
        title={
          <Text fz={22} fw={600} ta={'center'} className='!text-primary'>
            ارسال شكوى
          </Text>
        }
        classNames={{
          title: '!w-full',
        }}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Select
              label={
                <Text fz={16} fw={500}>
                  شكوى الى:
                </Text>
              }
              w='100%'
              placeholder='جهة الاستقبال ...'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
              data={[
                { label: 'المدير', value: USER_TYPE.MANAGER },
                { label: 'الامن', value: USER_TYPE.SECURITY_OFFICER },
              ]}
              size='sm'
              clearable
              {...form.getInputProps('reception')}
              onChange={(value) => {
                // Set to USER_TYPE.MANAGER if cleared to prevent undefined
                form.setFieldValue(
                  'reception',
                  (value as delegateSendComplaintFormValues['reception']) ??
                    USER_TYPE.MANAGER
                );
              }}
              error={form.errors.reception}
            />

            <TextInput
              label={
                <Text fz={16} fw={500}>
                  عنوان الشكوى:
                </Text>
              }
              placeholder='أدخل عنوان الشكوى...'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
              size='sm'
              {...form.getInputProps('title')}
              error={form.errors.title}
            />
            <Textarea
              label={
                <Text fz={16} fw={500}>
                  محتوى الشكوى
                </Text>
              }
              size='sm'
              placeholder='محتوى الشكوى...'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
              minRows={3}
              maxRows={6}
              autosize
              {...form.getInputProps('content')}
              error={form.errors.content}
            />
            <Group justify='flex-end'>
              <Button
                size='sm'
                type='button'
                variant='outline'
                onClick={() => {
                  close();
                  form.reset();
                }}
                fw={600}
                // className='!text-red-500'
                className='!border-red-500 !text-red-500'
              >
                إلغاء
              </Button>
              <Button
                size='sm'
                type='submit'
                disabled={!form.isValid()}
                className={cn(
                  '!shadow-lg',
                  !form.isValid() ? '!bg-primary/70' : '!bg-primary'
                )}
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
