'use client';

import {
  Aid,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { Stack, LoadingOverlay, Group, Text, ThemeIcon, Divider, Button } from '@mantine/core';
import {
  ACTION_ADD_EDIT_DISPLAY,
  DESTINATION_AID,
  DISTRIBUTION_MECHANISM,
  TYPE_GROUP_AIDS,
} from '@/@types/actors/common-types/index.type';
import { CheckSquare, SquarePen, SquarePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Common_Aid_Form from '../../common/aid-form/common-aid-form';
import { parseAsStringEnum, useQueryState, useQueryStates } from 'nuqs';
import { AddAidFormValuesType } from '@/validation/actor/manager/aids-management/add-aid-form-schema';
import Common_Aid_Delegates_List from '../../common/delegates/common-aid-delegates-list';
import Delegate_Aid_Add_Displaceds from '@/components/actors/general/aids-management/add/aid-add-displaceds/common-aid-add-displaceds';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { updateAid } from '@/actions/actors/general/aids-management/updateAid';
import { addAid } from '@/actions/actors/general/aids-management/addAid';

function Add_Aid_Header() {
  const [action] = useQueryState(
    'action',
    parseAsStringEnum(Object.values(ACTION_ADD_EDIT_DISPLAY)).withDefault(
      ACTION_ADD_EDIT_DISPLAY.ADD
    )
  );

  const headerMode = action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تعديل' : 'إضافة';

  return (
    <Group gap={10} justify='space-between' w='100%'>
      <Group align='center' gap={5}>
        <ThemeIcon size={25} radius='xl' color='white'>
          {action === ACTION_ADD_EDIT_DISPLAY.ADD ? (
            <SquarePlus size={18} className='text-primary' />
          ) : (
            <SquarePen size={18} className='text-primary' />
          )}
        </ThemeIcon>
        <Text fz={{ base: 16, md: 18 }} fw={600} className='!text-primary'>
          {headerMode} المساعدة :
        </Text>
      </Group>
    </Group>
  );
}

interface ManagerAidContentProps {
  isLoading: boolean;
  aid_Data?: Aid;
  manager_Id: number;
}

export default function Add_Aid_Content({
  aid_Data,
  manager_Id,
  isLoading,
}: ManagerAidContentProps) {
  const distributionMechanismDefault =
    (aid_Data?.distribution_mechanism as DISTRIBUTION_MECHANISM) ||
    DISTRIBUTION_MECHANISM.DELEGATES_LISTS;

  const [query, setQuery] = useQueryStates(
    {
      action: parseAsStringEnum(Object.values(ACTION_ADD_EDIT_DISPLAY)).withDefault(
        ACTION_ADD_EDIT_DISPLAY.ADD
      ),

      distributionMechanism: parseAsStringEnum(Object.values(DISTRIBUTION_MECHANISM)).withDefault(
        distributionMechanismDefault
      ),
    },
    { shallow: true }
  );

  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >([]);

  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<number[]>([]);
  console.log('🚀 ~ selectedDisplacedIds:', selectedDisplacedIds);

  useEffect(() => {
    if (aid_Data?.selected_delegates_portions) {
      setSelectedDelegatesPortions(aid_Data.selected_delegates_portions);
    } else {
      setSelectedDelegatesPortions([]);
    }
    if (aid_Data?.selected_displaced_Ids) {
      setSelectedDisplacedIds(aid_Data?.selected_displaced_Ids);
    } else {
      setSelectedDisplacedIds([]);
    }
    if (aid_Data) setQuery({ action: ACTION_ADD_EDIT_DISPLAY.EDIT });
  }, [aid_Data]);

  const isDisplaced = query.distributionMechanism == DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES;

  const actionAidMutation = useMutation({
    // const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: Aid) =>
      query.action === ACTION_ADD_EDIT_DISPLAY.EDIT && aid_Data?.id
        ? updateAid({ ...payload, id: aid_Data?.id })
        : addAid(payload),
    onSuccess: (response) => {
      if (response.status === 200) {
        setQuery({ action: ACTION_ADD_EDIT_DISPLAY.DISPLAY });
        notifications.show({
          title:
            query.action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تم تعديل المساعدة' : 'تم حفظ المساعدة',
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

  const is_completed = (values: AddAidFormValuesType) => {
    const isAdd = query.action === ACTION_ADD_EDIT_DISPLAY.ADD;
    const isEdit = query.action === ACTION_ADD_EDIT_DISPLAY.EDIT;

    // --- ADD MODE RULES ---
    if (isAdd) {
      // Security required? Mark incomplete
      if (values.security_required) return false;

      // Delegates scenario - need at least one delegate
      if (values.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS) {
        if (selectedDelegatesPortions.length === 0) return false;
      }

      // Displaced scenario - need at least one displaced person
      if (values.distribution_mechanism === DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES) {
        if (selectedDisplacedIds.length === 0) return false;
      }

      return true;
    }

    // --- EDIT MODE RULES ---
    if (isEdit) {
      // Security required but no security men assigned yet
      if (
        values.security_required &&
        (!aid_Data?.security_men || aid_Data?.security_men.length === 0)
      ) {
        return false;
      }

      // Delegates scenario - still need at least one delegate
      if (values.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS) {
        if (selectedDelegatesPortions.length === 0) return false;
      }

      // Displaced scenario - still need at least one displaced person
      if (values.distribution_mechanism === DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES) {
        if (selectedDisplacedIds.length === 0) return false;
      }

      return true;
    }

    // Default (should never hit)
    return false;
  };

  const handleSubmit = (values: AddAidFormValuesType) => {
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

    const selectedDelegatesPortionsValues =
      values.distribution_mechanism === DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES
        ? []
        : selectedDelegatesPortions;

    const payload: Aid = {
      id: aid_Data?.id ?? -1,
      ...values,
      additional_notes: values.additional_notes ?? '',
      displaced_single_portion: values.displaced_single_portion as number,
      selected_displaced_Ids: selectedDisplacedIds,
      selected_delegates_portions: selectedDelegatesPortionsValues,
      received_displaceds: aid_Data?.received_displaceds ?? [],
      // is_completed: false,
      is_completed: is_completed(values),
      aid_status: aid_Data?.aid_status ?? TYPE_GROUP_AIDS.ONGOING_AIDS,
    };

    actionAidMutation.mutate(payload);
  };

  return (
    <Stack pos='relative'>
      <LoadingOverlay
        visible={isLoading || actionAidMutation.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <Add_Aid_Header />

      <Common_Aid_Form
        onSubmit={handleSubmit}
        key={aid_Data?.id || 'new'}
        initialData={aid_Data}
        isDisabled={false}
      />

      {query.distributionMechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS && (
        <>
          <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />
          <Common_Aid_Delegates_List
            destination={aid_Data ? DESTINATION_AID.EDIT_AIDS : DESTINATION_AID.ADD_AIDS}
            selectedDelegatesPortions={selectedDelegatesPortions}
            setSelectedDelegatesPortions={setSelectedDelegatesPortions}
            aid_Id={aid_Data?.id ?? -1}
            aid_Data={aid_Data}
          />
        </>
      )}

      <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />

      <Delegate_Aid_Add_Displaceds
        aid_Data={aid_Data as Aid}
        actor_Id={manager_Id}
        role='MANAGER'
        selectedDisplacedIds={selectedDisplacedIds}
        setSelectedDisplacedIds={setSelectedDisplacedIds}
      />

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

      {actionAidMutation.isError && (
        <Text c='red' ta='center'>
          {actionAidMutation.error?.message || 'حدث خطأ أثناء معالجة المساعدة'}
        </Text>
      )}
    </Stack>
  );
}
