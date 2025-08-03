'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';
import { CheckSquare, Pin, SquarePen, SquarePlus } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import {
  parseAsInteger,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import Delegates_List from '@/components/actors/general/delegates/content/delegates-list';
import { AddAidFormValues } from '@/validation/actor/manager/aids-management/add-aid-form-schema';
import Add_Aid_Form from '@/components/actors/manager/aids-management/add/add-aid-form';
import {
  Aid,
  AidResponse,
  ReceivedDisplaceds,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { addAid } from '@/actions/actors/general/aids-management/addAid';
import { updateAid } from '@/actions/actors/general/aids-management/updateAid';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  ACTION_ADD_EDIT_DISPLAY,
  DELEGATE_PORTIONS,
  DESTINATION_AID,
  DISTRIBUTION_MECHANISM,
  QUANTITY_AVAILABILITY,
  TYPE_GROUP_AIDS,
} from '@/@types/actors/common-types/index.type';
import Aid_Displaceds_List from '../displaceds/delivery-displaceds/aid-displaceds-list';
import Aid_Delegates_List from '../delegates/aid-delegates-list';

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
        <Pin size={16} className='text-primary' />
        <Text fw={600} fz={18} className='text-primary'>
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
          rightSection={<SquarePen size={14} />}
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
  aid_Id?: number;
  initial_Data?: AidResponse;
}

export default function Add_Aid_Page({
  aid_Id,
  initial_Data,
}: AddAidPageProps) {
  const distributionMechanismDefault = initial_Data?.aid
    .distribution_mechanism as DISTRIBUTION_MECHANISM;

  const delegatesPortionsDefault =
    initial_Data?.aid.distribution_mechanism ===
    DISTRIBUTION_MECHANISM.DELEGATES_LISTS
      ? initial_Data.aid.delegates_portions
      : DELEGATE_PORTIONS.EQUAL;

  const quantityAvailabilityDefault =
    initial_Data?.aid?.quantity_availability ?? QUANTITY_AVAILABILITY.LIMITED;

  const existingQuantityDefault = initial_Data?.aid.existing_quantity ?? 0;

  const delegateSinglePortionDefault =
    initial_Data?.aid.distribution_mechanism ===
    DISTRIBUTION_MECHANISM.DELEGATES_LISTS
      ? (initial_Data?.aid?.delegate_single_portion as number)
      : 0;

  const [query, setQuery] = useQueryStates(
    {
      action: parseAsStringEnum(
        Object.values(ACTION_ADD_EDIT_DISPLAY)
      ).withDefault(ACTION_ADD_EDIT_DISPLAY.DISPLAY),

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

  // Disable form in view mode
  const isDisabled =
    !!initial_Data && query.action !== ACTION_ADD_EDIT_DISPLAY.EDIT;

  // Header mode
  const headerMode =
    !!initial_Data && query.action !== ACTION_ADD_EDIT_DISPLAY.EDIT
      ? 'عرض'
      : !!initial_Data && query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
      ? 'تعديل'
      : 'إضافة';

  const [receivedDisplaceds, setReceivedDisplaceds] = useState<
    ReceivedDisplaceds[]
  >(initial_Data?.aid?.received_displaceds || []);

  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<number[]>(
    initial_Data?.aid?.selected_displaced_Ids || []
  );

  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >(initial_Data?.aid?.selected_delegates_portions || []);

  const receivedDisplaced = initial_Data?.aid?.received_displaceds || [];

  // Check if aid is going directly to displaced families
  /*
   const isDisplaced =
     !!initial_Data &&
     initial_Data?.aid.distribution_mechanism ===
       DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES &&
     query.action == ACTION_ADD_EDIT_DISPLAY.DISPLAY
       ? true
       : !!initial_Data &&
         query.action == ACTION_ADD_EDIT_DISPLAY.EDIT &&
         query.distributionMechanism ===
           DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES
       ? true
       : query.action == ACTION_ADD_EDIT_DISPLAY.ADD &&
         query.distributionMechanism ===
           DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES
       ? true
       : false;
 */
  const isDisplaced =
    query.distributionMechanism === DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES;

  const actionAidMutation = useMutation({
    // const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: Aid) =>
      query.action === ACTION_ADD_EDIT_DISPLAY.EDIT && initial_Data?.aid.id
        ? updateAid({ ...payload, id: initial_Data?.aid.id })
        : addAid(payload),
    onSuccess: (response) => {
      if (response.status === 200) {
        setQuery({ action: ACTION_ADD_EDIT_DISPLAY.DISPLAY });
        notifications.show({
          title:
            query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
              ? 'تم تعديل المساعدة'
              : 'تم حفظ المساعدة',
          message: response.message || 'تم إرسال البيانات بنجاح',
          color: 'green',
          position: 'top-left',
        });
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

  const isCompleted = (values: AddAidFormValues) => {
    const isAdd = query.action === ACTION_ADD_EDIT_DISPLAY.ADD;
    const isEdit = query.action === ACTION_ADD_EDIT_DISPLAY.EDIT;

    // --- ADD MODE RULES ---
    if (isAdd) {
      // Security required? Mark incomplete
      if (values.security_required) return false;

      // Delegates scenario - need at least one delegate
      if (
        values.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS
      ) {
        if (selectedDelegatesPortions.length === 0) return false;
      }

      // Displaced scenario - need at least one displaced person
      if (
        values.distribution_mechanism ===
        DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES
      ) {
        if (selectedDisplacedIds.length === 0) return false;
      }

      return true;
    }

    // --- EDIT MODE RULES ---
    if (isEdit) {
      // Security required but no security men assigned yet
      if (
        values.security_required &&
        (!initial_Data?.aid.security_men ||
          initial_Data.aid.security_men.length === 0)
      ) {
        return false;
      }

      // Delegates scenario - still need at least one delegate
      if (
        values.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS
      ) {
        if (selectedDelegatesPortions.length === 0) return false;
      }

      // Displaced scenario - still need at least one displaced person
      if (
        values.distribution_mechanism ===
        DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES
      ) {
        if (selectedDisplacedIds.length === 0) return false;
      }

      return true;
    }

    // Default (should never hit)
    return false;
  };

  const handleSubmit = (values: AddAidFormValues) => {
    console.log('🚀 ~ handleSubmit ~ values:', values);
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

    /*const isCompleted =
      query.action === ACTION_ADD_EDIT_DISPLAY.ADD &&
      (values.distribution_mechanism ===
        DISTRIBUTION_MECHANISM.DELEGATES_LISTS ||
        values.security_required)
        ? false
        : query.action === ACTION_ADD_EDIT_DISPLAY.ADD &&
          values.distribution_mechanism ===
            DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES &&
          selectedDisplacedIds.length === 0
        ? false
        : query.action === ACTION_ADD_EDIT_DISPLAY.ADD &&
          values.distribution_mechanism ===
            DISTRIBUTION_MECHANISM.DELEGATES_LISTS &&
          selectedDelegatesPortions.length === 0
        ? false
        : query.action === ACTION_ADD_EDIT_DISPLAY.EDIT &&
          values.security_required &&
          (initial_Data?.aid.security_men?.length as number) == 0
        ? false
        : query.action === ACTION_ADD_EDIT_DISPLAY.EDIT &&
          values.distribution_mechanism ===
            DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES &&
          selectedDisplacedIds.length === 0
        ? false
        : query.action === ACTION_ADD_EDIT_DISPLAY.EDIT &&
          values.distribution_mechanism ===
            DISTRIBUTION_MECHANISM.DELEGATES_LISTS &&
          selectedDelegatesPortions.length === 0
        ? false
        : true;
 */

    const selectedDisplacedValues =
      query.action === ACTION_ADD_EDIT_DISPLAY.ADD &&
      values.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS
        ? []
        : selectedDisplacedIds;

    const payload: Aid = {
      id: initial_Data ? initial_Data.aid.id : -1,
      ...values,
      additional_notes: values.additional_notes ?? '',
      selected_displaced_Ids: selectedDisplacedValues,
      selected_delegates_portions: selectedDelegatesPortions,
      received_displaceds: receivedDisplaced,
      is_completed: isCompleted(values),
      aid_status: initial_Data?.aid?.aid_status ?? TYPE_GROUP_AIDS.ONGOING_AIDS,
    };
    console.log('🚀 ~ handleSubmit ~ payload:', payload);

    /* const payload: Aid = {
      id: initial_Data ? initial_Data.aid.id : -1,
      distribution_mechanism: values.distribution_mechanism,
      aid_name: values.aid_name,
      aid_type: values.aid_type,
      aid_content: values.aid_content,
      quantity_availability: values.quantity_availability,
      existing_quantity: values.existing_quantity,
      delegate_single_portion: values.delegate_single_portion,
      security_required: values.security_required,
      security_men: values.security_men,
      delivery_date: values.deliveryDate,
      notes: values.notes,
      selected_displaced_Ids: selectedDisplacedIds,
      selected_delegates_portions: selectedDelegatesPortions,
      received_displaceds: receivedDisplaced,
      is_completed: isCompleted(values),
      aid_status: initial_Data?.aid?.aid_status ?? TYPE_GROUP_AIDS.ONGOING_AIDS,
      ...(values.distribution_mechanism ===
        DISTRIBUTION_MECHANISM.DELEGATES_LISTS && {
        delegates_portions: values.delegates_portions,
      }),
    }; */

    actionAidMutation.mutate(payload);
  };

  return (
    <Stack p={10} w='100%' pos='relative'>
      <LoadingOverlay
        visible={actionAidMutation.isPending}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <Add_Aid_Header
        mode={headerMode}
        showEditButton={
          !!initial_Data && query.action !== ACTION_ADD_EDIT_DISPLAY.EDIT
        }
      />

      <Add_Aid_Form
        onSubmit={handleSubmit}
        initialData={initial_Data?.aid}
        isDisabled={isDisabled}
      />

      <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />

      {isDisplaced && (
        <Aid_Displaceds_List
          destination={
            !!initial_Data && query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
              ? DESTINATION_AID.EDIT_AIDS
              : !!initial_Data &&
                query.action === ACTION_ADD_EDIT_DISPLAY.DISPLAY
              ? DESTINATION_AID.DISPLAY_AIDS
              : DESTINATION_AID.ADD_AIDS
          }
          setSelectedDisplacedIds={setSelectedDisplacedIds}
          selectedDisplacedIds={selectedDisplacedIds}
          receivedDisplaceds={receivedDisplaceds}
          setReceivedDisplaceds={setReceivedDisplaceds}
          aid_Id={aid_Id}
        />
      )}

      {!isDisplaced && (
        <Aid_Delegates_List
          destination={
            !!initial_Data && query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
              ? DESTINATION_AID.EDIT_AIDS
              : !!initial_Data &&
                query.action === ACTION_ADD_EDIT_DISPLAY.DISPLAY
              ? DESTINATION_AID.DISPLAY_AIDS
              : DESTINATION_AID.ADD_AIDS
          }
          selectedDelegatesPortions={selectedDelegatesPortions}
          setSelectedDelegatesPortions={setSelectedDelegatesPortions}
          aid_Id={aid_Id ?? -1}
          aid_data={initial_Data?.aid}
        />
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
            loading={actionAidMutation.isPending}
            disabled={actionAidMutation.isPending}
          >
            {query.action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تعديل' : 'إضافة'}
          </Button>
        </Group>
      )}

      {actionAidMutation.isError && (
        <Text c='red' ta='center'>
          {actionAidMutation.error?.message || 'حدث خطأ أثناء معالجة المساعدة'}
        </Text>
      )}
    </Stack>
  );
}
