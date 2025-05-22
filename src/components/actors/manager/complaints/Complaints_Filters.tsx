'use client';
import { LocalFilters } from '@/app/(pages)/actor/manager/[manager_Id]/complaints/page';
import { UserType } from '@/constants/userTypes';
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
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import { z } from 'zod';

type Props = {
  setLocalFilters: React.Dispatch<React.SetStateAction<LocalFilters>>;
  initialFilters: {
    status: 'read' | 'pending' | null;
    sender_type: UserType | null;
    delegate_id: string | null;
    date_range: Date[] | null;
  };
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  complaintsNum?: number;
};

// Define validation schema
const filterSchema = z.object({
  status: z.enum(['read', 'pending']).nullable(),
  sender_type: z
    .enum(['DISPLACED', 'DELEGATE', 'SECURITY', 'SECURITY_OFFICER', 'MANAGER'])
    .nullable(),
  delegate_id: z.string().nullable(),
  date_range: z
    .tuple([z.string().nullable(), z.string().nullable()])
    .default([null, null]),
});

type FilterFormType = z.infer<typeof filterSchema>;

export default function Complaints_Filters({
  setLocalFilters,
  initialFilters,
  complaintsNum,
  setActivePage,
}: Props) {
  const initData: FilterFormType = {
    status: initialFilters.status ?? null,
    sender_type: initialFilters.sender_type ?? null,
    delegate_id: initialFilters.delegate_id ?? null,
    date_range: initialFilters.date_range
      ? [
          initialFilters.date_range[0].toString() ?? null,
          // initialFilters.date_range[0]?.toISOString().split('T')[0] ?? null,
          initialFilters.date_range[1]?.toString() ?? null,
          // initialFilters.date_range[1]?.toISOString().split('T')[0] ?? null,
        ]
      : [null, null],
  };

  const form = useForm<FilterFormType>({
    initialValues: initData,
    validate: zodResolver(filterSchema),
  });

  // Query state for search
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  const handleReset = () => {
    form.reset();
    setSearchInput('');
    setLocalFilters({
      status: null,
      sender_type: null,
      delegate_id: null,
      date_range: null,
    });
    setActivePage(1);
  };

  // Apply search
  const handleSearch = () => {
    setLocalFilters({
      status: null,
      sender_type: null,
      delegate_id: null,
      date_range: null,
    });
    setSearch(searchInput);
    setSearchInput('');
    form.reset();
    setActivePage(1);
  };

  // Apply filters
  const handleApplyFilters = (values: FilterFormType) => {
    setLocalFilters({
      status: values.status,
      sender_type: values.sender_type,
      delegate_id: values.delegate_id,
      date_range: values.date_range[0]
        ? [
            new Date(values.date_range[0]!),
            values.date_range[1] ? new Date(values.date_range[1]!) : null,
          ].filter((d): d is Date => d !== null)
        : null,
    });
    setActivePage(1);
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

        <Group
          flex={1}
          gap={0}
          wrap='nowrap'
          className='border-1 border-gray-300 rounded-lg overflow-hidden'
        >
          <TextInput
            w={{ base: '100%' }}
            placeholder='رقم الهوية/الاسم ...'
            size='sm'
            value={searchInput}
            classNames={{
              input:
                '!border-none !outline-none placeholder:!text-sm !text-primary !font-medium',
            }}
            leftSection={<Search size={18} />}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            w={50}
            size='sm'
            px={10}
            fz={16}
            fw={500}
            c={'dark'}
            radius={'none'}
            className='!bg-gray-300 !rounded-none'
            onClick={handleSearch}
          >
            بحث
          </Button>
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
              <Text fz={18} fw={600}>
                حالة الشكوى :
              </Text>
            }
            placeholder='حالة الشكوى'
            data={[
              { value: 'read', label: 'تمت القراءة' },
              { value: 'pending', label: 'قيد الانتظار' },
            ]}
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
              <Text fz={18} fw={600}>
                المرسل :
              </Text>
            }
            placeholder='مرسل الشكوي'
            data={[
              { value: 'DISPLACED', label: 'نازح' },
              { value: 'DELEGATE', label: 'مندوب' },
              { value: 'SECURITY', label: 'أمن' },
              { value: 'SECURITY_OFFICER', label: 'مسؤول الامن' },
            ]}
            size='sm'
            leftSection={<Send size={15} />}
            {...form.getInputProps('sender_type')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />
          {form.getValues().sender_type == 'DELEGATE' && (
            <Select
              label={
                <Text fz={18} fw={600}>
                  المندوب :
                </Text>
              }
              placeholder='اختر المندوب'
              data={[
                { label: 'بدون مندوب', value: '-1' },
                { label: 'محمد', value: '1' },
                { label: 'فيصل', value: '2' },
                { label: 'خالد', value: '3' },
                { label: 'منذر', value: '4' },
              ]}
              size='sm'
              leftSection={<User size={15} />}
              {...form.getInputProps('delegate_id')}
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
            />
          )}

          <DatePickerInput
            type='range'
            label={
              <Text fz={18} fw={600}>
                تاريخ الإرسال :
              </Text>
            }
            placeholder='نطاق اختيار التواريخ'
            leftSection={<Calendar size={15} />}
            {...form.getInputProps('date_range')}
          />

          <Group hidden={form.getValues().sender_type !== 'DELEGATE'} />
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
