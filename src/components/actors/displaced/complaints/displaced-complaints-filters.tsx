'use client';
import { UserType } from '@/constants/userTypes';
import {
  COMPLAINTS_STATUS,
  COMPLAINTS_STATUS_LABELS,
} from '@/content/actor/delegate/complaints';
import {
  displacedComplaintFilterFormSchema,
  displacedComplaintFilterFormValues,
} from '@/validation/actor/displaced/complaints/displacedComplaintsSchema';
import {
  Button,
  Flex,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import {
  Activity,
  Calendar,
  ListFilter,
  RotateCcw,
  Search,
  Send,
  User,
} from 'lucide-react';
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import { useState } from 'react';

interface DisplacedComplaintsFiltersProps {
  setLocalFilters: React.Dispatch<
    React.SetStateAction<displacedComplaintFilterFormValues>
  >;
  complaintsNum?: number;
}

export default function Displaced_Complaints_Filters({
  setLocalFilters,
  complaintsNum,
}: DisplacedComplaintsFiltersProps) {
  const [query, setQuery] = useQueryStates({
    'complaints-page': parseAsInteger.withDefault(1),
  });

  const form = useForm<displacedComplaintFilterFormValues>({
    initialValues: {
      status: null,
      date_range: [null, null],
      receiver_type: null,
    },

    validate: zodResolver(displacedComplaintFilterFormSchema),
  });

  const handleReset = () => {
    form.reset();
    setLocalFilters({
      status: null,
      receiver_type: null,
      date_range: [null, null],
    });
    setQuery({ 'complaints-page': 1 });
  };

  // Apply search
  const handleSearch = () => {
    setLocalFilters({
      status: null,
      receiver_type: null,
      date_range: [null, null],
    });

    form.reset();
  };

  // Apply filters
  const handleApplyFilters = (values: displacedComplaintFilterFormValues) => {
    setLocalFilters({
      status: values.status,
      receiver_type: values.receiver_type,
      date_range: values.date_range, // Keep as [string | null, string | null]
    });
    setQuery({ 'complaints-page': 1 });
  };

  return (
    <Stack w='100%' mb={20} gap={20}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 10, md: 0 }}
        justify={'space-between'}
      >
        <Group flex={1} gap={10}>
          <Text fw={600} fz={20} className='!text-primary'>
            الفلاتر:
          </Text>
          <Text
            fz={14}
            px={5}
            className='border-1 border-second rounded-md text-dark'
          >
            {complaintsNum ?? 0}
          </Text>
          <Text fw={500} fz={18} className='!text-dark'>
            شكوى
          </Text>
        </Group>
      </Flex>

      <form onSubmit={form.onSubmit(handleApplyFilters)}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing='sm'
          p={15}
          className='shadow-md border-1 border-gray-400 rounded-xl'
        >
          <Select
            label={
              <Text fz={16} fw={500}>
                حالة الشكوى :
              </Text>
            }
            placeholder='حالة الشكوى'
            data={Object.entries(COMPLAINTS_STATUS).map(([key, value]) => ({
              value: value,
              label: COMPLAINTS_STATUS_LABELS[value],
            }))}
            size='sm'
            leftSection={<Activity size={15} />}
            {...form.getInputProps('status')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />
          <Select
            label={
              <Text fz={16} fw={500}>
                المستقبل :
              </Text>
            }
            placeholder='مستقبل الشكوي'
            data={[
              { value: 'MANAGER', label: 'المدير' },
              { value: 'DELEGATE', label: 'مندوب' },
              { value: 'SECURITY_OFFICER', label: 'مسؤول الامن' },
            ]}
            size='sm'
            leftSection={<Send size={15} />}
            {...form.getInputProps('receiver_type')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />

          <DatePickerInput
            type='range'
            label={
              <Text fz={16} fw={500}>
                تاريخ الإرسال :
              </Text>
            }
            placeholder='نطاق اختيار التواريخ'
            leftSection={<Calendar size={15} />}
            {...form.getInputProps('date_range')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />

          <Group hidden={form.getValues().receiver_type !== 'DELEGATE'} />
          <Group flex={1} justify='end'>
            <Button
              type='button'
              w={100}
              size='sm'
              px={15}
              fz={16}
              fw={500}
              c={'dark'}
              radius={'lg'}
              className='!justify-end !items-end !self-end !bg-gray-300 !shadow-lg'
              rightSection={<RotateCcw size={18} />}
              onClick={handleReset}
            >
              إفراغ
            </Button>
            <Button
              type='submit'
              w={100}
              size='sm'
              px={15}
              fz={16}
              fw={500}
              c={'white'}
              radius={'lg'}
              className='!justify-end !items-end !self-end !bg-primary !shadow-lg'
              rightSection={<ListFilter size={18} />}
            >
              فلتر
            </Button>
          </Group>
        </SimpleGrid>
      </form>
    </Stack>
  );
}
