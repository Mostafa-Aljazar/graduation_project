'use client';
import {
  Button,
  Flex,
  Group,
  RangeSlider,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileDown, ListFilter, RotateCcw, Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import { DelegatesFilters } from './delegates-list';

interface DelegateFiltersProps {
  setLocalFilters: React.Dispatch<React.SetStateAction<DelegatesFilters>>;
  delegatesNum: number;
}

// FIXME: get max data from API.
const initData: DelegatesFilters = {
  displaceds_number: [0, 1000],
  tents_number: [0, 200],
};

export default function Delegate_Filters({
  setLocalFilters,
  delegatesNum,
}: DelegateFiltersProps) {
  const [searchInput, setSearchInput] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  const form = useForm({
    initialValues: initData,
  });

  const handleApplyFilters = () => {
    setLocalFilters({
      ...form.values,
    });
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setSearchInput('');
    form.setValues(initData);
    setLocalFilters(initData);
    setResetKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setSearchInput('');
    setSearch('');
    form.setValues(initData);
    setLocalFilters(initData);
    setResetKey((prev) => prev + 1);
  };

  return (
    <Stack w='100%' mb={20} gap={20}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 10, md: 0 }}
        justify='space-between'
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
            {delegatesNum ?? 0}
          </Text>
          <Text fw={500} fz={18} className='!text-dark'>
            مندوب
          </Text>
        </Group>

        <Group
          flex={2}
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
            c='dark'
            radius='none'
            className='!bg-gray-300 !rounded-none'
            onClick={handleSearch}
          >
            بحث
          </Button>
        </Group>

        <Group flex={1} justify='end'>
          <Button
            w={120}
            size='sm'
            px={15}
            fz={16}
            fw={500}
            c='white'
            radius='lg'
            className='!justify-end !items-end !self-end !bg-primary !shadow-lg'
            rightSection={<FileDown size={18} />}
          >
            تنزيل
          </Button>
        </Group>
      </Flex>

      <form onSubmit={form.onSubmit(handleApplyFilters)}>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          p={15}
          className='shadow-md border-1 border-gray-400 rounded-xl'
        >
          <Stack w='90%' gap={30}>
            <Text fz={18} fw={600}>
              عدد النازحين:
            </Text>
            <RangeSlider
              labelAlwaysOn
              color='var(--color-primary)'
              min={0}
              max={1000}
              marks={[
                { value: 0, label: '0' },
                { value: 1000, label: '1000' },
              ]}
              key={`displaceds_number-${resetKey}`}
              {...form.getInputProps('displaceds_number')}
            />
          </Stack>
          <Stack w='90%' gap={30}>
            <Text fz={18} fw={600}>
              عدد الخيام:
            </Text>
            <RangeSlider
              labelAlwaysOn
              color='var(--color-primary)'
              min={0}
              max={200}
              marks={[
                { value: 0, label: '0' },
                { value: 200, label: '200' },
              ]}
              key={`tents_number-${resetKey}`}
              {...form.getInputProps('tents_number')}
            />
          </Stack>

          <Group visibleFrom='md' />
          <Group flex={1} justify='end' mt={10}>
            <Button
              type='button'
              w={100}
              size='sm'
              px={15}
              fz={16}
              fw={500}
              c='dark'
              radius='lg'
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
              c='white'
              radius='lg'
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
