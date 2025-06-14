'use client';

import { useState } from 'react';
import { Button, Divider, Group, Stack, Text } from '@mantine/core';
import { CheckSquare, SquarePlus } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { parseAsStringEnum, useQueryState } from 'nuqs';

import Displaced_List from '@/components/actors/manager/aids-management/add/displaced/displaced-list';
import Delegates_List from '@/components/actors/manager/aids-management/add/delegates/delegates-list';

import { DISTRIBUTION_MECHANISM } from '@/content/actor/manager/aids-management';
import { addAidFormValues } from '@/validation/manager/add-aid-form-schema';
import Add_Aid_Form from '@/components/actors/manager/aids-management/add/add-aid-form';

function Add_Aid_Header() {
  return (
    <Group justify='space-between'>
      <Group gap={10}>
        <SquarePlus size={20} className='text-primary' />
        <Text fw={600} fz={{ base: 18, md: 22 }} className='text-primary'>
          إضافة مساعدة :
        </Text>
      </Group>
    </Group>
  );
}

export interface SelectedDelegatePortion {
  delegate_id: string | number;
  portion: number;
}

export default function Add_Aid_Page() {
  const [distributionMechanism] = useQueryState(
    'distributionMechanism',
    parseAsStringEnum<DISTRIBUTION_MECHANISM>(
      Object.values(DISTRIBUTION_MECHANISM)
    )
  );

  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<
    (string | number)[]
  >([]);

  // get Delegates id's with its Portions
  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >([]);

  const isDisplaced =
    distributionMechanism === DISTRIBUTION_MECHANISM.displaced_families;

  const handleSubmit = (values: addAidFormValues) => {
    // Example payload for API or debugging
    const payload = {
      ...values,
      selectedDisplacedIds,
      selectedDelegatesPortions,
    };

    console.log('Add Aid Payload:', payload);

    // Trigger notification (optional)
    notifications.show({
      title: 'تم حفظ المساعدة',
      message: 'تم إرسال البيانات بنجاح',
      color: 'green',
      position: 'top-left',
    });
  };

  return (
    <Stack p={10} w='100%'>
      <Add_Aid_Header />

      <Add_Aid_Form onSubmit={handleSubmit} />

      <Divider h={1} bg={'#DFDEDC'} w={'100%'} flex={1} />

      {isDisplaced ? (
        <Displaced_List
          selectedDisplacedIds={selectedDisplacedIds}
          setSelectedDisplacedIds={setSelectedDisplacedIds}
        />
      ) : (
        <Delegates_List
          selectedDelegatesPortions={selectedDelegatesPortions}
          setSelectedDelegatesPortions={setSelectedDelegatesPortions}
        />
      )}

      <Group mt='md' justify='center'>
        <Button
          type='submit'
          form='add-aid-form'
          w={120}
          size='sm'
          px={15}
          fz={16}
          fw={500}
          c='white'
          radius='lg'
          className='!bg-primary !shadow-lg'
          rightSection={<CheckSquare size={18} />}
        >
          إضافة
        </Button>
      </Group>
    </Stack>
  );
}
