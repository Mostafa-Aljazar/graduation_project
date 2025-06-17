'use client';

import {
  Button,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { Calendar, ListFilter, Package, RotateCcw, Users } from 'lucide-react';
import { TYPE_AIDS } from '@/content/actor/manager/aids-management';
import { z } from 'zod';
import { Aids_Management_LocalFilters } from './aids-management-content';

type Props = {
  setLocalFilters: React.Dispatch<
    React.SetStateAction<Aids_Management_LocalFilters>
  >;
  initialFilters: Aids_Management_LocalFilters;
  aidsNum?: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

// Define validation schema using TYPE_AIDS keys
const filterSchema = z.object({
  type: z.enum(Object.keys(TYPE_AIDS) as [string, ...string[]]).nullable(),
  date_range: z
    .tuple([z.string().nullable(), z.string().nullable()])
    .default([null, null])
    .refine(
      ([start, end]) => {
        if (start && end) {
          return new Date(end) >= new Date(start);
        }
        return true; // If either is null, no validation needed
      },
      {
        message: 'يجب أن يكون تاريخ الانتهاء أكبر من أو يساوي تاريخ البداية',
        path: ['date_range'], // Apply error to the date_range field
      }
    ),
  recipients_range: z
    .tuple([z.number().nullable(), z.number().nullable()])
    .default([null, null])
    .refine(
      ([from, to]) => {
        if (from !== null && to !== null) {
          return to >= from;
        }
        return true; // If either is null, no validation needed
      },
      {
        message: 'يجب أن يكون الحد الأقصى أكبر من أو يساوي الحد الأدنى',
        path: ['recipients_range.1'], // Apply error to the "to" field
      }
    ),
});

type FilterFormType = z.infer<typeof filterSchema>;

export default function Aids_Management_Filters({
  setLocalFilters,
  initialFilters,
  aidsNum,
  setActivePage,
}: Props) {
  const initData: FilterFormType = {
    type: initialFilters.type ?? TYPE_AIDS.ALL_AIDS,
    date_range: initialFilters.date_range
      ? [
          initialFilters.date_range[0]?.toString() ?? null,
          initialFilters.date_range[1]?.toString() ?? null,
        ]
      : [null, null],
    recipients_range: initialFilters.recipients_range
      ? [
          initialFilters.recipients_range[0] ?? null,
          initialFilters.recipients_range[1] ?? null,
        ]
      : [null, null],
  };

  const form = useForm<FilterFormType>({
    initialValues: initData,
    validate: zodResolver(filterSchema),
  });

  const handleReset = () => {
    form.reset();
    form.setValues({
      type: TYPE_AIDS.ALL_AIDS,
      date_range: [null, null],
      recipients_range: [null, null],
    });
    setLocalFilters({
      type: TYPE_AIDS.ALL_AIDS,
      date_range: null,
      recipients_range: null,
    });
    setActivePage(1);
  };

  // Apply filters
  const handleApplyFilters = (values: FilterFormType) => {
    let dateRange: Date[] | null = null;
    if (values.date_range[0]) {
      try {
        const startDate = new Date(values.date_range[0]!);
        const endDate = values.date_range[1]
          ? new Date(values.date_range[1]!)
          : null;
        dateRange = [startDate, endDate].filter((d): d is Date => d !== null);
      } catch (error) {
        console.error('Error parsing dates:', error);
        form.setFieldError('date_range', 'تاريخ غير صالح');
        return;
      }
    }

    setLocalFilters({
      type: values.type as TYPE_AIDS | null,
      date_range: dateRange,
      recipients_range: values.recipients_range[0]
        ? [
            values.recipients_range[0]!,
            values.recipients_range[1] ?? null,
          ].filter((n): n is number => n !== null)
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
            {aidsNum ?? 0}
          </Text>
          <Text fw={500} fz={18} className='!text-dark'>
            مساعدة
          </Text>
        </Group>
      </Flex>

      <form onSubmit={form.onSubmit(handleApplyFilters)} className='!flex-1'>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing='sm'
          p={15}
          className='shadow-md border-1 border-gray-400 rounded-xl'
        >
          <Select
            label={
              <Text fz={16} fw={500}>
                نوع المساعدة :
              </Text>
            }
            placeholder='نوع المساعدة'
            data={Object.entries(TYPE_AIDS).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            size='sm'
            leftSection={<Package size={15} />}
            {...form.getInputProps('type')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />

          <DatePickerInput
            type='range'
            label={
              <Text fz={16} fw={500}>
                تاريخ التوزيع :
              </Text>
            }
            placeholder='نطاق اختيار التواريخ'
            leftSection={<Calendar size={15} />}
            {...form.getInputProps('date_range')}
            error={form.errors.date_range} // Display validation error
          />

          <Stack gap={0}>
            <Text fz={16} fw={500}>
              عدد المستفيدين :
            </Text>
            <Group
              gap={0}
              wrap='nowrap'
              className='border-1 border-gray-300 rounded-lg'
            >
              <NumberInput
                placeholder='من'
                size='sm'
                leftSection={<Users size={15} />}
                {...form.getInputProps('recipients_range.0')}
                classNames={{
                  input:
                    '!border-none !outline-none placeholder:!text-sm !text-primary !font-normal',
                }}
                className='!border-none !outline-none'
                min={0}
              />
              <Divider
                orientation='vertical'
                h={'100%'}
                w={1}
                mx={0}
                my={'auto'}
                className='flex-shrink-0 !bg-gray-300'
              />
              <NumberInput
                placeholder='إلى'
                size='sm'
                leftSection={<Users size={15} />}
                {...form.getInputProps('recipients_range.1')}
                classNames={{
                  input:
                    '!border-none !outline-none placeholder:!text-sm !text-primary !font-normal',
                }}
                min={form.values.recipients_range[0] as number}
                error={form.errors['recipients_range.1']} // Display validation error on "to" field
              />
            </Group>
          </Stack>

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
              rightSection={<RotateCcw size={16} />}
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
              rightSection={<ListFilter size={16} />}
            >
              فلتر
            </Button>
          </Group>
        </SimpleGrid>
      </form>
    </Stack>
  );
}
