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
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

import Displaced_List from '@/components/actors/manager/aids-management/add/displaced/displaced-list';
import Delegates_List from '@/components/actors/manager/aids-management/add/delegates/delegates-list';
import { DISTRIBUTION_MECHANISM } from '@/content/actor/manager/aids-management';
import { addAidFormValues } from '@/validation/actor/manager/add-aid-form-schema';
import Add_Aid_Form from '@/components/actors/manager/aids-management/add/add-aid-form';
import {
  AddAidPayload,
  AidResponse,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { addAid } from '@/actions/actors/manager/aids-management/addAid';
import { updateAid } from '@/actions/actors/manager/aids-management/updateAid';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { ACTION_ADD_EDIT } from '@/constants';

function Add_Aid_Header({ mode }: { mode: 'تعديل' | 'إضافة' | 'عرض' }) {
  return (
    <Group justify='space-between'>
      <Group gap={10}>
        <SquarePlus size={20} className='text-primary' />
        <Text fw={600} fz={{ base: 18, md: 22 }} className='text-primary'>
          {mode} المساعدة
        </Text>
      </Group>
    </Group>
  );
}

interface AddAidPageProps {
  initialData?: AidResponse;
  aid_id?: number;
}

export default function Add_Aid_Page({ initialData, aid_id }: AddAidPageProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [query] = useQueryStates(
    {
      distributionMechanism: parseAsStringEnum<DISTRIBUTION_MECHANISM>(
        Object.values(DISTRIBUTION_MECHANISM)
      ).withDefault(
        initialData?.aid.distributionMechanism ||
          DISTRIBUTION_MECHANISM.delegates_lists
      ),
      action: parseAsStringEnum<ACTION_ADD_EDIT>(
        Object.values(ACTION_ADD_EDIT)
      ).withDefault(ACTION_ADD_EDIT.ADD),
    },
    { shallow: true }
  );

  // Determine if the form is disabled
  const isDisabled = !!initialData && query.action !== ACTION_ADD_EDIT.EDIT;

  // Determine header mode
  const headerMode =
    query.action === ACTION_ADD_EDIT.EDIT && initialData
      ? 'تعديل'
      : initialData
      ? 'عرض'
      : 'إضافة';

  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<
    (string | number)[]
  >(initialData?.aid.selectedDisplacedIds || []);

  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >(initialData?.aid.selectedDelegatesPortions || []);

  const isDisplaced =
    query.distributionMechanism === DISTRIBUTION_MECHANISM.displaced_families;

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: AddAidPayload) =>
      query.action === ACTION_ADD_EDIT.EDIT && aid_id
        ? updateAid({ ...payload, id: aid_id })
        : addAid(payload),
    onSuccess: (response) => {
      if (response.status === '200') {
        notifications.show({
          title:
            query.action === ACTION_ADD_EDIT.EDIT
              ? 'تم تعديل المساعدة'
              : 'تم حفظ المساعدة',
          message: response.message || 'تم إرسال البيانات بنجاح',
          color: 'green',
          position: 'top-left',
        });
        router.replace(MANAGER_ROUTES_fUNC(user?.id as number).AIDS_MANAGEMENT);
      } else {
        notifications.show({
          title: 'خطأ',
          message: response.message || 'حدث خطأ أثناء معالجة المساعدة',
          color: 'red',
          position: 'top-left',
        });
      }
    },
    onError: (error: any) => {
      notifications.show({
        title: 'خطأ',
        message: error.message || 'حدث خطأ أثناء معالجة المساعدة',
        color: 'red',
        position: 'top-left',
      });
    },
  });

  const receivedDisplaced = initialData?.aid.receivedDisplaced || [];

  const handleSubmit = (values: addAidFormValues) => {
    if (isDisabled) return; // Prevent submission if form is disabled

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

    const isCompleted =
      query.action == ACTION_ADD_EDIT.ADD
        ? values.distributionMechanism ==
            DISTRIBUTION_MECHANISM.delegates_lists || values.securityRequired
        : false; // FIXME: handel it from back-end

    const payload: AddAidPayload = {
      id: aid_id ? Number(aid_id) : -1,
      ...values,
      selectedDisplacedIds,
      selectedDelegatesPortions,
      receivedDisplaced: receivedDisplaced,
      isCompleted: isCompleted,
    };

    mutate(payload);
  };

  return (
    <Stack p={10} w='100%' pos={'relative'}>
      <LoadingOverlay
        visible={isPending}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      <Add_Aid_Header mode={headerMode} />

      <Add_Aid_Form
        onSubmit={handleSubmit}
        initialData={initialData?.aid as AddAidPayload}
        isDisabled={isDisabled}
      />

      <Divider h={1} bg={'#DFDEDC'} w={'100%'} flex={1} />

      {isDisplaced ? (
        <Displaced_List
          selectedDisplacedIds={selectedDisplacedIds}
          setSelectedDisplacedIds={setSelectedDisplacedIds}
          isDisabled={isDisabled}
          receivedDisplaced={initialData?.aid?.receivedDisplaced}
          aid_id={aid_id}
        />
      ) : (
        <Stack gap={20}>
          <Delegates_List
            selectedDelegatesPortions={selectedDelegatesPortions}
            setSelectedDelegatesPortions={setSelectedDelegatesPortions}
            // isDisabled={isDisabled}
          />
          <Divider h={1} bg={'#DFDEDC'} w={'100%'} flex={1} />

          {/* {initialData && ( */}
          <Displaced_List
            title={'كشوفات المناديب عن النازحين:'}
            selectedDisplacedIds={selectedDisplacedIds}
            setSelectedDisplacedIds={setSelectedDisplacedIds}
            isDisabled={isDisabled}
            // receivedDisplaced={initialData?.aid?.selectedDisplacedIds}
            aid_id={aid_id}
          />
          {/* // )} */}
        </Stack>
      )}

      {!isDisabled && (
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
            {query.action === ACTION_ADD_EDIT.EDIT ? 'تعديل' : 'إضافة'}
          </Button>
        </Group>
      )}

      {isError && (
        <Text c='red' ta='center'>
          {error?.message || 'حدث خطأ أثناء معالجة المساعدة'}
        </Text>
      )}
    </Stack>
  );
}
