'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';
import { CheckSquare, Pin, SquarePlus } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import {
  parseAsInteger,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from 'nuqs';

import Delegates_List from '@/components/actors/general/delegates/content/delegates-list';
import {
  DELEGATE_PORTIONS,
  DISTRIBUTION_MECHANISM,
  QUANTITY_AVAILABILITY,
} from '@/content/actor/manager/aids-management';
import { addAidFormValues } from '@/validation/actor/manager/aids-management/add-aid-form-schema';
import Add_Aid_Form from '@/components/actors/manager/aids-management/add/add-aid-form';
import {
  Aid,
  AidResponse,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { addAid } from '@/actions/actors/manager/aids-management/addAid';
import { updateAid } from '@/actions/actors/manager/aids-management/updateAid';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Displaceds_List from '@/components/actors/general/Displaced/content/displaceds-list';
import { DESTINATION_DISPLACED } from '@/content/actor/displaced/filter';
import { DESTINATION_DELEGATES } from '@/content/actor/delegate/filter';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants';
import { getAid } from '@/actions/actors/manager/aids-management/getAid';

function Add_Aid_Header({
  mode,
  showEditButton = false,
}: {
  mode: 'تعديل' | 'إضافة' | 'عرض';
  showEditButton: boolean;
}) {
  const [action, setAction] = useQueryState(
    'action',
    parseAsStringEnum(Object.values(ACTION_ADD_EDIT_DISPLAY)).withDefault(
      ACTION_ADD_EDIT_DISPLAY.ADD
    )
  );

  return (
    <Group gap={10} justify='space-between' w='100%'>
      <Group gap={10}>
        <SquarePlus size={20} className='text-primary' />
        <Text fw={600} fz={{ base: 18, md: 22 }} className='text-primary'>
          {mode} المساعدة
        </Text>
      </Group>

      {showEditButton && (
        <Button
          size='sm'
          fz={16}
          fw={500}
          c='white'
          radius='lg'
          className='!bg-primary'
          rightSection={<Pin size={16} />}
          hidden={action === ACTION_ADD_EDIT_DISPLAY.EDIT}
          onClick={() => setAction(ACTION_ADD_EDIT_DISPLAY.EDIT)}
        >
          تعديل المساعدة
        </Button>
      )}
    </Group>
  );
}

interface AddAidPageProps {
  aid_id?: number;
  initialData?: AidResponse;
}

export default function Add_Aid_Page({ aid_id, initialData }: AddAidPageProps) {
  const { user } = useAuth();
  const router = useRouter();

  // قيم افتراضية للاستعلامات لتعريف useQueryStates
  const distributionMechanismDefault =
    initialData?.aid?.distributionMechanism ??
    DISTRIBUTION_MECHANISM.delegates_lists;

  const delegatesPortionsDefault =
    initialData?.aid?.delegatesPortions ?? DELEGATE_PORTIONS.equal;

  const quantityAvailabilityDefault =
    initialData?.aid?.quantityAvailability ?? QUANTITY_AVAILABILITY.limited;

  const existingQuantityDefault = initialData?.aid?.existingQuantity ?? 0;

  const delegateSinglePortionDefault =
    initialData?.aid?.delegateSinglePortion ?? 0;

  const [query] = useQueryStates(
    {
      action: parseAsStringEnum(
        Object.values(ACTION_ADD_EDIT_DISPLAY)
      ).withDefault(ACTION_ADD_EDIT_DISPLAY.ADD),

      distributionMechanism: parseAsStringEnum(
        Object.values(DISTRIBUTION_MECHANISM)
      ).withDefault(distributionMechanismDefault),

      delegatesPortions: parseAsStringEnum(
        Object.values(DELEGATE_PORTIONS)
      ).withDefault(delegatesPortionsDefault),

      quantityAvailability: parseAsStringEnum(
        Object.values(QUANTITY_AVAILABILITY)
      ).withDefault(quantityAvailabilityDefault),

      existingQuantity: parseAsInteger.withDefault(existingQuantityDefault),

      delegateSinglePortion: parseAsInteger.withDefault(
        delegateSinglePortionDefault
      ),
    },
    { shallow: true }
  );

  // تفعيل تعطيل الفورم في حالة العرض فقط
  const isDisabled =
    !!initialData && query.action !== ACTION_ADD_EDIT_DISPLAY.EDIT;

  // تحديد وضعية الهيدر
  const headerMode =
    !!initialData && query.action !== ACTION_ADD_EDIT_DISPLAY.EDIT
      ? 'عرض'
      : !!initialData && query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
      ? 'تعديل'
      : 'إضافة';

  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<number[]>(
    initialData?.aid?.selectedDisplacedIds || []
  );

  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >(initialData?.aid?.selectedDelegatesPortions || []);

  const receivedDisplaced = initialData?.aid?.receivedDisplaced || [];

  const isDisplaced = !!initialData
    ? initialData.aid.distributionMechanism ===
      DISTRIBUTION_MECHANISM.displaced_families
    : query.distributionMechanism === DISTRIBUTION_MECHANISM.displaced_families;

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: Aid) =>
      query.action === ACTION_ADD_EDIT_DISPLAY.EDIT && initialData?.aid.id
        ? updateAid({ ...payload, id: initialData?.aid.id || -1 })
        : addAid(payload),
    onSuccess: (response) => {
      if (response.status === '200') {
        notifications.show({
          title:
            query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
              ? 'تم تعديل المساعدة'
              : 'تم حفظ المساعدة',
          message: response.message || 'تم إرسال البيانات بنجاح',
          color: 'green',
          position: 'top-left',
        });
        // يمكن إعادة التوجيه هنا إذا أردت
        // router.replace(MANAGER_ROUTES_fUNC(user?.id as number).AIDS_MANAGEMENT);
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

  const handleSubmit = (values: addAidFormValues) => {
    if (isDisabled) return;

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
      query.action === ACTION_ADD_EDIT_DISPLAY.ADD
        ? values.distributionMechanism ===
            DISTRIBUTION_MECHANISM.delegates_lists || values.securityRequired
        : false; // ضبط حسب الحاجة من الباك اند

    const payload: Aid = {
      id: !!initialData ? (aid_id as number) : -1,
      ...values,
      selectedDisplacedIds,
      selectedDelegatesPortions,
      receivedDisplaced,
      isCompleted,
    };

    mutate(payload);
  };

  return (
    <Stack p={10} w='100%' pos='relative'>
      <LoadingOverlay
        visible={isPending}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      <Add_Aid_Header
        mode={headerMode}
        showEditButton={
          !!initialData && query.action !== ACTION_ADD_EDIT_DISPLAY.EDIT
        }
      />

      <Add_Aid_Form
        onSubmit={handleSubmit}
        initialData={initialData?.aid}
        isDisabled={isDisabled}
      />

      <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />

      {isDisplaced ? (
        <Displaceds_List
          destination={
            !!initialData && query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
              ? DESTINATION_DISPLACED.EDIT_AIDS
              : !!initialData
              ? DESTINATION_DISPLACED.DISPLAY_AIDS
              : DESTINATION_DISPLACED.ADD_AIDS
          }
          title='توزيع المساعدات'
          setSelectedDisplacedIds={setSelectedDisplacedIds}
          selectedDisplacedIds={selectedDisplacedIds}
          receivedDisplaced={initialData?.aid?.receivedDisplaced || []}
          aid_id={aid_id || -1}
        />
      ) : (
        <Stack gap={20}>
          <Delegates_List
            destination={
              !!initialData && query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
                ? DESTINATION_DELEGATES.EDIT_AIDS
                : !!initialData
                ? DESTINATION_DELEGATES.DISPLAY_AIDS
                : DESTINATION_DELEGATES.ADD_AIDS
            }
            title='توزيع المساعدات على المناديب'
            aid_id={aid_id ?? -1}
            selectedDelegatesPortions={selectedDelegatesPortions}
            setSelectedDelegatesPortions={setSelectedDelegatesPortions}
            aid_data={initialData?.aid}
          />
          <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />
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
            {query.action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تعديل' : 'إضافة'}
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
