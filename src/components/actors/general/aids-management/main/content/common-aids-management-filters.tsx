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
import {
  aidsManagementFilterFormSchema,
  aidsManagementFilterFormType,
} from '@/validation/actor/manager/aids-management/aids-management-filters-schema';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  TYPE_AIDS,
  TYPE_AIDS_LABELS,
} from '@/@types/actors/common-types/index.type';

interface CommonAidsManagementFiltersProps {
  setLocalFilters: Dispatch<SetStateAction<aidsManagementFilterFormType>>;
  aidsNum?: number;
}

export default function Common_Aids_Management_Filters({
  setLocalFilters,
  aidsNum,
}: CommonAidsManagementFiltersProps) {
  const [activePage, setActivePage] = useQueryState(
    'aids-page',
    parseAsInteger.withDefault(1)
  );

  const initData: aidsManagementFilterFormType = {
    type: null,
    date_range: [null, null],
    recipients_range: [null, null],
  };

  const form = useForm<aidsManagementFilterFormType>({
    initialValues: initData,
    validate: zodResolver(aidsManagementFilterFormSchema),
  });

  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    form.reset();
    setLocalFilters(initData);
    setResetKey((prev) => prev + 1);
    setActivePage(1);
  };

  const handleApplyFilters = (values: aidsManagementFilterFormType) => {
    setLocalFilters({
      type: values.type as TYPE_AIDS | null,
      date_range: values.date_range,
      recipients_range: values.recipients_range,
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
          <Text fw={600} fz={16} className='!text-primary'>
            الفلاتر :
          </Text>
          <Text
            fz={16}
            px={5}
            pt={5}
            className='border-1 border-second rounded-md !h-fit text-dark'
          >
            {aidsNum ?? 0}
          </Text>
          <Text fw={600} fz={16} className='!text-primary'>
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
              value: value,
              label: TYPE_AIDS_LABELS[value],
            }))}
            size='sm'
            leftSection={<Package size={15} />}
            key={`type-${resetKey}`}
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
            key={`date_range-${resetKey}`}
            {...form.getInputProps('date_range')}
            error={form.errors.date_range} // Display validation error
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
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
                key={`recipients_range.0-${resetKey}`}
                {...form.getInputProps('recipients_range.0')}
                classNames={{
                  input:
                    '!border-none !outline-none placeholder:!text-sm !text-primary !font-normal',
                }}
                className='!border-none !outline-none'
                min={0}
                flex={1}
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
                flex={1}
                placeholder='إلى'
                size='sm'
                leftSection={<Users size={15} />}
                key={`recipients_range.1-${resetKey}`}
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
