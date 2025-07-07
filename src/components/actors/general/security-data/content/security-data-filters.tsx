'use client';

import { zodResolver } from '@mantine/form';
import { Button, Flex, Group, Stack, Text, TextInput } from '@mantine/core';
import { FileUp, Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useForm } from '@mantine/form';
import { z } from 'zod';

interface SecurityDataFiltersProps {
  securityNum: number;
}

const searchFilterSchema = z.object({
  search: z.string().trim().max(100, 'الحد الأقصى 100 حرف').optional(),
});

type SearchFilterValues = z.infer<typeof searchFilterSchema>;

export default function Security_Data_Filters({
  securityNum,
}: SecurityDataFiltersProps) {
  const [_, setSearch] = useQueryState('search', parseAsString.withDefault(''));

  const form = useForm<SearchFilterValues>({
    initialValues: { search: '' },
    validate: zodResolver(searchFilterSchema),
  });

  const handleSearch = (values: SearchFilterValues) => {
    setSearch(values.search || '');
    form.reset();
  };

  const handleReset = () => {
    form.reset();
    setSearch('');
  };

  return (
    <form onSubmit={form.onSubmit(handleSearch)}>
      <Stack w='100%' mb={20} gap={20}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 10, md: 0 }}
          justify='space-between'
          align='center'
        >
          {/* Left: Info Label */}
          <Group flex={1} gap={10}>
            <Text fw={600} fz={18} className='!text-primary'>
              الفلاتر :
            </Text>
            <Text
              fz={14}
              px={5}
              className='border-1 border-second rounded-md text-dark'
            >
              {securityNum}
            </Text>
            <Text fw={500} fz={18} className='!text-dark'>
              عنصر أمني
            </Text>
          </Group>

          {/* Middle: Search */}
          <Group
            flex={2}
            gap={0}
            wrap='nowrap'
            className='border-1 border-gray-300 rounded-lg overflow-hidden'
          >
            <TextInput
              {...form.getInputProps('search')}
              placeholder='رقم الهوية / رقم الخيمة...'
              size='sm'
              w={{ base: '100%' }}
              leftSection={<Search size={18} />}
              classNames={{
                input:
                  '!border-none !outline-none placeholder:!text-sm !text-primary !font-normal',
              }}
            />
            <Button
              type='submit'
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

          {/* Right: Export Button */}
          <Group flex={1} justify='end'>
            <Button
              size='sm'
              px={15}
              fz={16}
              fw={500}
              c='white'
              radius='lg'
              className='!bg-primary !shadow-lg'
              rightSection={<FileUp size={16} />}
              onClick={handleReset}
            >
              تصدير
            </Button>
          </Group>
        </Flex>
      </Stack>
    </form>
  );
}
