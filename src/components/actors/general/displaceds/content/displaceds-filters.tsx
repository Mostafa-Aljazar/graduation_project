'use client';

import {
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
import { useForm, zodResolver } from '@mantine/form';
import { ListFilter, RotateCcw, Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import {
  ACCOMMODATION_TYPE,
  ACCOMMODATION_TYPE_LABELS,
  AGES,
  AGES_LABELS,
  FAMILY_STATUS_TYPE,
  FAMILY_STATUS_TYPE_LABELS,
  CHRONIC_DISEASE,
  CHRONIC_DISEASE_LABELS,
  WIFE_STATUS,
  WIFE_STATUS_LABELS,
} from '@/@types/actors/common-types/index.type';
import { fakeDelegates } from '@/content/actor/general/fake-delegates';
import {
  displacedsFilterSchema,
  displacedsFilterValues,
} from '@/validation/actor/general/displaceds-filter-form';
import useAuth from '@/hooks/useAuth';

interface DisplacedsFiltersProps {
  setLocalFilters: React.Dispatch<React.SetStateAction<displacedsFilterValues>>;
  displacedNum: number;
}

export default function Displaceds_Filters({
  setLocalFilters,
  displacedNum,
}: DisplacedsFiltersProps) {
  const { user, isDelegate } = useAuth();

  const initData: displacedsFilterValues = {
    wife_status: null,
    family_number: null,
    ages: [],
    chronic_disease: null,
    accommodation_type: null,
    family_status_type: null,
    delegate: isDelegate && user?.id ? [user.id.toString()] : [],
  };

  const [searchInput, setSearchInput] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  const form = useForm<displacedsFilterValues>({
    initialValues: initData,
    validate: zodResolver(displacedsFilterSchema),
  });

  const handleApplyFilters = () => {
    setLocalFilters(form.values);
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setSearchInput('');
    form.setValues(initData);
    setLocalFilters(initData);
    form.reset();
    setResetKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setSearchInput('');
    setSearch('');
    form.reset();
    setLocalFilters(initData);
    setResetKey((prev) => prev + 1);
  };

  return (
    <Stack w='100%' mb={20} gap={20}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 10, md: 0 }}
        justify='space-between'
        align={'start'}
      >
        <Group flex={1} gap={10}>
          <Text fw={600} fz={18} className='!text-primary'>
            عدد النازحين :
          </Text>
          <Text
            fz={14}
            px={5}
            className='border-1 border-second rounded-md text-dark'
          >
            {displacedNum ?? 0}
          </Text>
          <Text fw={500} fz={18} className='!text-dark'>
            نازح
          </Text>
        </Group>

        <Stack flex={2} gap={2}>
          <Group
            gap={0}
            wrap='nowrap'
            className='border-1 border-gray-300 rounded-lg overflow-hidden'
          >
            <TextInput
              w={{ base: '100%' }}
              placeholder='رقم الهوية/رقم الخيمة...'
              size='sm'
              classNames={{
                input:
                  '!border-none !outline-none placeholder:!text-sm !text-primary !font-normal',
              }}
              leftSection={<Search size={18} />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              w={80}
              size='sm'
              px={10}
              fz={16}
              fw={500}
              c='dark'
              radius='none'
              className='!bg-gray-300 !rounded-none'
            >
              بحث
            </Button>
          </Group>
        </Stack>
      </Flex>
      <form onSubmit={form.onSubmit(handleApplyFilters)}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing='sm'
          p={15}
          className='shadow-sm border-1 border-gray-200 rounded-xl'
        >
          <Select
            label={
              <Text fz={16} fw={500}>
                الزوجة :
              </Text>
            }
            placeholder='حالة الزوجة'
            data={Object.entries(WIFE_STATUS).map(([key, value]) => ({
              value: value,
              label: WIFE_STATUS_LABELS[value],
            }))}
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
            data={Object.entries(AGES).map(([key, value]) => ({
              value: value,
              label: AGES_LABELS[value],
            }))}
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
                حالة صحية مزمنة :
              </Text>
            }
            placeholder='الحالة'
            data={Object.entries(CHRONIC_DISEASE).map(([key, value]) => ({
              value: value,
              label: CHRONIC_DISEASE_LABELS[value],
            }))}
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
                نوع الإيواء :
              </Text>
            }
            placeholder='المكان'
            data={Object.entries(ACCOMMODATION_TYPE).map(([key, value]) => ({
              value: value,
              label: ACCOMMODATION_TYPE_LABELS[value],
            }))}
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
            data={Object.entries(FAMILY_STATUS_TYPE).map(([key, value]) => ({
              value: value,
              label: FAMILY_STATUS_TYPE_LABELS[value],
            }))}
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
            data={fakeDelegates.map((item) => ({
              value: item.id.toString(),
              label: item.name,
            }))}
            // disabled={destination == 'AID' && role == 'DELEGATE'}
            size='sm'
            key={`delegate-${resetKey}`}
            {...form.getInputProps('delegate')}
            classNames={{
              input:
                'placeholder:!text-sm  placeholder-shown:!hidden placeholder:!hidden !text-primary !font-normal',
            }}
            className='placeholder-shown:!hidden'
          />
          <Group visibleFrom='lg' />
          <Group flex={1} justify='end'>
            <Button
              type='button'
              size='sm'
              px={15}
              fz={16}
              fw={500}
              c='dark'
              radius='lg'
              className='!justify-end !items-end !self-end !bg-gray-300 !shadow-lg'
              rightSection={<RotateCcw size={15} />}
              onClick={handleReset}
            >
              إفراغ
            </Button>
            <Button
              type='submit'
              size='sm'
              px={15}
              fz={16}
              fw={500}
              c='white'
              radius='lg'
              className='!justify-end !items-end !self-end !bg-primary !shadow-lg'
              rightSection={<ListFilter size={15} />}
            >
              فلتر
            </Button>
          </Group>
        </SimpleGrid>
      </form>
    </Stack>
  );
}
