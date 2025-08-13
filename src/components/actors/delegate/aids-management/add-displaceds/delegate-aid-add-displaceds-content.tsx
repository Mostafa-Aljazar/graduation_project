'use state';

import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { Stack, Divider, LoadingOverlay, Group, Button, Text } from '@mantine/core';
import { DISTRIBUTION_MECHANISM, TYPE_GROUP_AIDS } from '@/@types/actors/common-types/index.type';
import Common_Aid_Add_Displaceds from '../../../general/aids-management/add/aid-add-displaceds/common-aid-add-displaceds';
import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import Delegate_Aid_Info from '../common/delegate-aid-info';
import {
  addAidDisplaceds,
  addAidDisplacedsProps,
} from '@/actions/actors/general/aids-management/addAidDisplaceds';
import { modalActionResponse } from '@/@types/common/modal/commonActionResponse.type';

interface DelegateAidAddDisplacedsContentProps {
  isLoading: boolean;
  aid_Data: Aid;
  delegate_Id: number;
}

export default function Delegate_Aid_Add_Displaceds_Content({
  aid_Data,
  delegate_Id,
  isLoading,
}: DelegateAidAddDisplacedsContentProps) {
  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<number[]>(
    (aid_Data && aid_Data?.selected_displaced_Ids) ?? []
  );

  const actionAidMutation = useMutation<modalActionResponse, Error, addAidDisplacedsProps>({
    // const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addAidDisplaceds,
    onSuccess: (response) => {
      if (response.status === 200) {
        notifications.show({
          title: 'تم حفظ المساعدة',
          message: response.message || 'تم إضافة النازحين للمساعدة بنجاح',
          color: 'green',
          position: 'top-left',
        });
      } else {
        notifications.show({
          title: 'خطأ',
          message: response.message || 'حدث خطأ أثناء إضافة النازحين للمساعدة',
          color: 'red',
          position: 'top-left',
        });
      }
    },
    onError: (error: any) => {
      notifications.show({
        title: 'خطأ',
        message: error.message || 'حدث خطأ أثناء إضافة النازحين للمساعدة',
        color: 'red',
        position: 'top-left',
      });
    },
  });

  const handelAddDisplaceds = () => {
    if (aid_Data && selectedDisplacedIds.length === 0) {
      notifications.show({
        title: 'قم بتحديد النازحين',
        message: 'يجب تحديد النازحين المستهدفين',
        color: 'red',
        position: 'top-left',
      });
      return;
    }

    actionAidMutation.mutate({
      actor_Id: delegate_Id,
      role: 'DELEGATE',
      aid_Id: aid_Data.id,
      displaceds_Ids: selectedDisplacedIds,
    });
  };

  return (
    <Stack pos={'relative'}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      {aid_Data && <Delegate_Aid_Info aid_Data={aid_Data} />}

      <Divider h={1} className='!bg-primary' />

      {aid_Data &&
        aid_Data.aid_status == TYPE_GROUP_AIDS.COMING_AIDS &&
        aid_Data.distribution_mechanism == DISTRIBUTION_MECHANISM.DELEGATES_LISTS && (
          <Common_Aid_Add_Displaceds
            selectedDisplacedIds={selectedDisplacedIds}
            setSelectedDisplacedIds={setSelectedDisplacedIds}
            aid_Data={aid_Data}
            actor_Id={delegate_Id}
            role='DELEGATE'
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
          loading={actionAidMutation.isPending}
          disabled={actionAidMutation.isPending}
          onClick={handelAddDisplaceds}
        >
          إضافة
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
