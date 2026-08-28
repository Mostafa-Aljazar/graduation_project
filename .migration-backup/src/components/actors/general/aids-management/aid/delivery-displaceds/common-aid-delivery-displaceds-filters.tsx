'use client';

import {
  SearchDisplacedFormValues,
  searchDisplacedSchema,
} from '@/validation/actor/general/displaceds/search-displaced-form';
import { Button, Flex, Group, Stack, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Search, Users } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useEffect } from 'react';

interface CommonAidDeliveryDisplacedsFiltersProps {
  displacedNum: number;
}

export default function Common_Aid_Delivery_Displaceds_Filters({
  displacedNum,
}: CommonAidDeliveryDisplacedsFiltersProps) {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

  const form = useForm<SearchDisplacedFormValues>({
    initialValues: {
      search: '',
    },
    validate: zodResolver(searchDisplacedSchema),
  });

  useEffect(() => {
    if (search) {
      form.setFieldValue('search', search);
    }
  }, [search]);

  const handleSearch = () => {
    if (form.validate().hasErrors) return;
    setSearch(form.values.search || '');
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
          <Text fz={14} px={5} className='border-1 border-second rounded-md text-dark'>
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
            <form onSubmit={form.onSubmit(handleSearch)} style={{ display: 'flex', width: '100%' }}>
              <TextInput
                w='100%'
                placeholder='رقم الهوية/رقم الخيمة...'
                size='sm'
                leftSection={<Search size={18} />}
                value={form.values.search}
                onChange={(e) => form.setFieldValue('search', e.target.value)}
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
            </form>
          </Group>
          {form.errors.search && (
            <Text c='red' fz={12} mt={5} ml={10}>
              {form.errors.search}
            </Text>
          )}
        </Stack>
      </Flex>
    </Stack>
  );
}
