'use client';
import Add_Form from '@/components/actors/manager/aids-management/add/add-form';
import Displaced_List from '@/components/actors/manager/aids-management/add/Displaced_List/displaced-list';
import { Button, Group, Stack, Text, Textarea } from '@mantine/core';
import { CheckSquare, RotateCcw, SquarePlus } from 'lucide-react';

export default function Add_Aid() {
  const handleSubmit = () => {
    console.log('🚀 ~ handleSubmit ~ ');
  };

  const handleReset = () => {
    // form.reset();
    // setCategoryPortions({});
    // setDist_Mech(DISTRIBUTION_MECHANISM.delegates_lists);
    // router.push('/');
  };

  return (
    <Stack p={10} pos={'relative'} w={'100%'}>
      <Group justify='space-between' align='center'>
        <Group gap={10}>
          <SquarePlus size={20} className='!text-primary' />
          <Text fw={600} fz={{ base: 18, md: 22 }} className='!text-primary'>
            إضافة مساعدة :
          </Text>
        </Group>
      </Group>
      <Add_Form />
      <Displaced_List />
      <Group mt='md' justify='center'>
        <Button
          type='button'
          w={100}
          size='sm'
          px={15}
          fz={16}
          fw={500}
          c='dark'
          radius='lg'
          className='justify-end items-end self-end bg-gray-300 shadow-lg'
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
          className='justify-end items-end self-end bg-primary shadow-lg'
          rightSection={<CheckSquare size={18} />}
        >
          حفظ
        </Button>
      </Group>
    </Stack>
  );
}
