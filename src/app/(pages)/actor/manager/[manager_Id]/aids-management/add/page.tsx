'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';
import { CheckSquare, SquarePlus } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { parseAsStringEnum, useQueryState } from 'nuqs';

import Displaced_List from '@/components/actors/manager/aids-management/add/displaced/displaced-list';
import Delegates_List from '@/components/actors/manager/aids-management/add/delegates/delegates-list';
import { DISTRIBUTION_MECHANISM } from '@/content/actor/manager/aids-management';
import { addAidFormValues } from '@/validation/manager/add-aid-form-schema';
import Add_Aid_Form from '@/components/actors/manager/aids-management/add/add-aid-form';
import {
  AddAidPayload,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { addAid } from '@/actions/actors/manager/aids-management/addAid';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';

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

export default function Add_Aid_Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [distributionMechanism] = useQueryState(
    'distributionMechanism',
    parseAsStringEnum<DISTRIBUTION_MECHANISM>(
      Object.values(DISTRIBUTION_MECHANISM)
    )
  );

  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<
    (string | number)[]
  >([]);
  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >([]);

  const isDisplaced =
    distributionMechanism === DISTRIBUTION_MECHANISM.displaced_families;

  // React Query mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: AddAidPayload) => addAid(payload), // Call the server action
    onSuccess: (response) => {
      if (response.status === '200') {
        notifications.show({
          title: 'تم حفظ المساعدة',
          message: response.message || 'تم إرسال البيانات بنجاح',
          color: 'green',
          position: 'top-left',
        });
        router.replace(MANAGER_ROUTES_fUNC(user?.id as number).AIDS_MANAGEMENT);
      } else {
        notifications.show({
          title: 'خطأ',
          message: response.message || 'حدث خطأ أثناء إضافة المساعدة',
          color: 'red',
          position: 'top-left',
        });
      }
    },
    onError: (error: any) => {
      notifications.show({
        title: 'خطأ',
        message: error.message || 'حدث خطأ أثناء إضافة المساعدة',
        color: 'red',
        position: 'top-left',
      });
    },
  });

  const handleSubmit = (values: addAidFormValues) => {
    if (isDisplaced && selectedDisplacedIds.length === 0) {
      notifications.show({
        title: 'قم بتحديد النازحين',
        message: 'يجب تحديد النازحين المستهدفين',
        color: 'red',
        position: 'top-left',
      });
      return;
    }
    if (!isDisplaced && selectedDelegatesPortions.length === 0) {
      notifications.show({
        title: 'قم بتحديد المناديب',
        message: 'يجب تحديد حصص المناديب المستهدفين',
        color: 'red',
        position: 'top-left',
      });
      return;
    }

    const payload: AddAidPayload = {
      ...values,
      selectedDisplacedIds,
      selectedDelegatesPortions,
    };

    // Trigger the mutation
    mutate(payload);
  };

  return (
    <Stack p={10} w='100%' pos={'relative'}>
      <LoadingOverlay
        visible={isPending}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
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
          loading={isPending}
          disabled={isPending}
        >
          إضافة
        </Button>
      </Group>

      {isError && (
        <Text c='red' ta='center'>
          {error?.message || 'حدث خطأ أثناء إضافة المساعدة'}
        </Text>
      )}
    </Stack>
  );
}
