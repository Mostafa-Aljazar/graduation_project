'use client';
import {
  Box,
  Button,
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileUp, ListFilter, RotateCcw, Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import React, { useRef, useState } from 'react';

interface Filters {
  wife_status: string;
  family_number: number | undefined;
  ages: string[];
  chronic_disease: string;
  accommodation_type: string;
  case_type: string;
  delegate: string[];
}

type Props = {
  setLocalFilters: React.Dispatch<React.SetStateAction<Filters>>;
  displacedNum: number;
};

const initData = {
  wife_status: '',
  family_number: undefined,
  ages: [],
  chronic_disease: '',
  accommodation_type: '',
  case_type: '',
  delegate: [],
};

export default function Displaced_Filters({
  setLocalFilters,
  displacedNum,
}: Props) {
  // Query state for search
  const [searchInput, setSearchInput] = useState('');
  // Reset key to force re-render of select components
  const [resetKey, setResetKey] = useState(0);
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  // Initialize form with useForm (excluding search)
  const form = useForm({
    initialValues: initData,
  });

  // Apply filters by updating setLocalFilters with form values and search
  const handleApplyFilters = () => {
    setLocalFilters({
      ...form.values,
    });
  };

  // Apply search
  const handleSearch = () => {
    setSearch(searchInput);
    setSearchInput('');

    // Reset form with explicit values
    form.setValues(initData);
    // Reset local filters
    setLocalFilters(initData);
    // Increment reset key to force re-render of select components
    setResetKey((prev) => prev + 1);
  };

  // Reset filters
  const handleReset = () => {
    // Reset search
    setSearchInput('');
    // Reset URL params
    setSearch('');

    // Reset form with explicit values
    form.setValues(initData);

    // Reset local filters
    setLocalFilters(initData);

    // Increment reset key to force re-render of select components
    setResetKey((prev) => prev + 1);
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
            fz={14}
            px={5}
            className='border-1 border-second rounded-md text-dark'
          >
            {displacedNum ?? 0}
          </Text>
          <Text fw={500} fz={16} className='!text-dark'>
            نازح
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
            placeholder='رقم الهوية/رقم الخيمة...'
            size='sm'
            value={searchInput}
            classNames={{
              input:
                '!border-none !outline-none placeholder:!text-sm !text-primary  ',
            }}
            leftSection={<Search size={18} />}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            w={80}
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
              <Text fz={16} fw={500}>
                الزوجة :
              </Text>
            }
            placeholder='حالة الزوجة'
            data={[
              { label: 'حامل', value: 'pregnant' },
              { label: 'مرضعة', value: 'wet_nurse' },
            ]}
            size='sm'
            key={`wife_status-${resetKey}`}
            {...form.getInputProps('wife_status')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />

          <NumberInput
            label={
              <Text fz={16} fw={500}>
                عدد الأفراد :
              </Text>
            }
            placeholder='0'
            max={99}
            min={0}
            allowDecimal={false}
            size='sm'
            key={`family_number-${resetKey}`}
            {...form.getInputProps('family_number')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

          <MultiSelect
            label={
              <Text fz={16} fw={500}>
                أعمار الأفراد :
              </Text>
            }
            placeholder='حدد أعمار الأفراد'
            data={[
              { label: 'اقل من 6 شهور', value: 'less_than_6_month' },
              {
                label: 'من 6 شهور الى عامين',
                value: 'from_6_month_to_2_years',
              },
              {
                label: 'من 2 عام الى 6 أعوام',
                value: 'from_2_years_to_6_years',
              },
              {
                label: 'من 6 أعوام الى 12 عام',
                value: 'from_6_years_to_12_years',
              },
              {
                label: 'من 12 عام الى 18 عام',
                value: 'from_12_years_to_18_years',
              },
              { label: 'أكبر من 18 عام', value: 'more_than_18' },
            ]}
            size='sm'
            key={`ages-${resetKey}`}
            {...form.getInputProps('ages')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

          <Select
            label={
              <Text fz={16} fw={500}>
                صحة المزمنة :
              </Text>
            }
            placeholder='الحالة'
            data={[
              { label: 'لا يوجد', value: 'false' },
              { label: 'يوجد', value: 'true' },
            ]}
            size='sm'
            key={`chronic_disease-${resetKey}`}
            {...form.getInputProps('chronic_disease')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />

          <Select
            label={
              <Text fz={16} fw={500}>
                نوع الايواء :
              </Text>
            }
            placeholder='المكان'
            data={[
              { label: 'داخلي - خيمة', value: 'indoor_tent' },
              { label: 'داخلي - مبنى', value: 'indoor_building' },
              { label: 'خارجي', value: 'outdoor' },
            ]}
            size='sm'
            key={`accommodation_type-${resetKey}`}
            {...form.getInputProps('accommodation_type')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />

          <Select
            label={
              <Text fz={16} fw={500}>
                نوع الحالة :
              </Text>
            }
            placeholder='الحالة'
            data={[
              { label: 'عادية', value: 'normal' },
              { label: 'صعبة', value: 'difficult' },
              { label: 'حرجة', value: 'critical' },
            ]}
            size='sm'
            key={`case_type-${resetKey}`}
            {...form.getInputProps('case_type')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
            clearable
          />

          <MultiSelect
            label={
              <Text fz={16} fw={500}>
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
            key={`delegate-${resetKey}`}
            {...form.getInputProps('delegate')}
            classNames={{
              input: 'placeholder:!text-sm !text-primary !font-normal',
            }}
          />

          <Group visibleFrom='lg' />
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
