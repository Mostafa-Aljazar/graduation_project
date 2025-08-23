'use client';

import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
  Select,
  Divider,
  ThemeIcon,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { Send, X, ShieldAlert, Clock4, FileText, UserCheck, ClipboardList } from 'lucide-react';
import { z } from 'zod';
import { addSecurityTask } from '@/actions/actors/security/tasks/addSecurityTask';
import { updateSecurityTask } from '@/actions/actors/security/tasks/updateSecurityTask';
import { notifications } from '@mantine/notifications';
import { Task } from '@/@types/actors/security/tasks/TasksResponse.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TASKS_TABS } from '@/@types/actors/common-types/index.type';
import { getSecurityNames } from '@/actions/actors/general/security-data/getSecurityNames';
import { SecurityNamesResponse } from '@/@types/actors/general/security-data/securitiesDataResponse.types';

const createTaskSchema = z.object({
  title: z.string().min(3, 'العنوان قصير جدًا'),
  body: z.string().min(10, 'المحتوى قصير جدًا'),
  dateTime: z.date({ required_error: 'التاريخ والوقت مطلوبان' }),
  security_men: z.array(z.string()),
  type: z.nativeEnum(TASKS_TABS),
});

type CreateTaskValues = z.infer<typeof createTaskSchema>;

interface SecurityMan {
  id: string;
  name: string;
}

interface SecurityTaskFormModalProps {
  opened: boolean;
  onClose: () => void;
  security_Id: number;
  taskToEdit?: Task | null;
}

export default function Security_Task_Form_Modal({
  opened,
  onClose,
  security_Id,
  taskToEdit,
}: SecurityTaskFormModalProps) {
  const [securityData, setSecurityData] = useState<SecurityMan[]>([]);
  const queryClient = useQueryClient();

  const form = useForm<CreateTaskValues>({
    initialValues: {
      title: '',
      body: '',
      dateTime: new Date(),
      security_men: [],
      type: TASKS_TABS.COMPLETED_TASKS,
    },
    validate: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (taskToEdit) {
      form.setValues({
        title: taskToEdit.title,
        body: taskToEdit.body,
        dateTime: new Date(taskToEdit.dateTime),
        security_men: taskToEdit.security_men.map((id) => id.toString()),
        type: taskToEdit.type,
      });
    }
  }, [taskToEdit, opened]);

  const {
    data: securityNames,
    isLoading,
    error,
  } = useQuery<SecurityNamesResponse>({
    queryKey: ['security-names'],
    queryFn: () => getSecurityNames({}),
  });

  useEffect(() => {
    if (securityNames?.security_names) {
      const securityNamesMapped = securityNames.security_names.map((security) => ({
        ...security,
        id: security.id.toString(),
      }));
      setSecurityData(securityNamesMapped);
    }
  }, [securityNames]);

  const taskMutation = useMutation({
    mutationFn: async (data: CreateTaskValues) => {
      const payload = {
        security_Id,
        ...data,
        security_men: data.security_men.map(Number),
      };

      if (taskToEdit) {
        return await updateSecurityTask({ task_Id: taskToEdit.id, ...payload });
      }

      return await addSecurityTask(payload);
    },
    onSuccess: (res) => {
      notifications.show({
        title: 'نجاح',
        message: res.message,
        color: 'grape',
        position: 'top-left',
        withBorder: true,
      });

      form.reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ['security-tasks'] });
    },
    onError: (err: any) => {
      notifications.show({
        title: 'خطأ',
        message: err?.message || 'فشل في العملية',
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = (values: CreateTaskValues) => {
    taskMutation.mutate(values);
  };

  const securityOptions = [
    ...securityData.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    ...form.values.security_men
      .filter((id) => !securityData.find((d) => d.id === id))
      .map((id) => ({
        value: id,
        label: `عنصر #${id}`,
      })),
  ];

  return (
    <Modal
      data-click='action'
      opened={opened}
      onClose={() => {
        form.reset();
        onClose();
      }}
      title={
        <Text fz={18} fw={600} ta='center' className='!text-primary'>
          {taskToEdit ? 'تعديل المهمة' : 'إنشاء مهمة أمنية جديدة'}
        </Text>
      }
      centered
      overlayProps={{ blur: 3 }}
      classNames={{ title: '!w-full' }}
      radius='md'
      size='lg'
      pos='relative'
      withCloseButton
      onClick={(e) => e.stopPropagation()} // ← Add this line
    >
      <LoadingOverlay
        visible={taskMutation.isPending}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <form onSubmit={form.onSubmit(handleSubmit)} data-click='action'>
        <Stack gap={20}>
          <TextInput
            label={labelWithIcon(FileText, 'عنوان المهمة')}
            placeholder='أدخل العنوان'
            size='sm'
            radius='md'
            {...form.getInputProps('title')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

          <Textarea
            label={labelWithIcon(ClipboardList, 'تفاصيل المهمة')}
            placeholder='اكتب التفاصيل...'
            size='sm'
            radius='md'
            autosize
            minRows={4}
            {...form.getInputProps('body')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

          <DateTimePicker
            label={labelWithIcon(Clock4, 'التاريخ والوقت')}
            placeholder='اختر التاريخ والوقت'
            withSeconds={false}
            valueFormat='DD/MM/YYYY - hh:mm A'
            size='sm'
            radius='md'
            value={form.values.dateTime}
            onChange={(value) =>
              form.setFieldValue('dateTime', value ? new Date(value) : form.values.dateTime)
            }
            error={form.errors.dateTime}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

          <MultiSelect
            label={labelWithIcon(UserCheck, 'عناصر الأمن')}
            placeholder='اختر عناصر الأمن'
            data={securityOptions}
            searchable
            size='sm'
            radius='md'
            nothingFoundMessage='لا توجد نتائج'
            {...form.getInputProps('security_men')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            disabled={isLoading}
          />

          <Select
            label={labelWithIcon(ShieldAlert, 'نوع المهمة')}
            placeholder='اختر نوع المهمة'
            size='sm'
            radius='md'
            data={[
              { value: TASKS_TABS.UPCOMING_TASKS, label: 'مهمة جارية' },
              { value: TASKS_TABS.COMPLETED_TASKS, label: 'مهمة مكتملة' },
            ]}
            {...form.getInputProps('type')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />
        </Stack>

        <Divider my='md' />

        <Group justify='flex-end' mt='md'>
          <Button
            variant='outline'
            color='red'
            size='sm'
            radius='md'
            rightSection={<X size={14} />}
            onClick={() => {
              onClose();
              form.reset();
            }}
            disabled={taskMutation.isPending}
          >
            إلغاء
          </Button>

          <Button
            data-click='action'
            size='sm'
            radius='md'
            type='submit'
            rightSection={<Send size={16} />}
            className='!bg-primary shadow-md text-white'
            disabled={!form.isValid() || taskMutation.isPending}
          >
            {taskToEdit ? 'تعديل' : 'إنشاء'}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

function labelWithIcon(Icon: React.ElementType, text: string) {
  return (
    <Group align='center' gap={8}>
      <ThemeIcon variant='light' size='sm' className='!rounded-full'>
        <Icon size={16} />
      </ThemeIcon>
      <Text fz={16} fw={500}>
        {text}
      </Text>
    </Group>
  );
}
