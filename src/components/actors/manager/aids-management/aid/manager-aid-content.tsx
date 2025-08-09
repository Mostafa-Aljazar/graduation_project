'use client';
import {
  Aid,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import {
  Stack,
  Divider,
  LoadingOverlay,
  Group,
  Text,
  Button,
  ThemeIcon,
  Badge,
} from '@mantine/core';
import {
  DELEGATE_DESTINATION_AID,
  DESTINATION_AID,
  DISTRIBUTION_MECHANISM,
  MANAGER_DESTINATION_AID,
  TYPE_GROUP_AIDS,
} from '@/@types/actors/common-types/index.type';
import { Package, Pin, SquarePen } from 'lucide-react';
import Add_Aid_Form from '../add/add-aid-form';
import Common_Aid_Form from '../common/aid-form/common-aid-form';
import Delegate_Aid_Delivery_Displaceds from '@/components/actors/general/aids-management/aid/delivery-displaceds/common-aid-delivery-displaceds';
import Common_Aid_Delegates_List from '../common/delegates/common-aid-delegates-list';
import { useEffect, useState } from 'react';
import Common_Aid_Delivery_Displaceds from '@/components/actors/general/aids-management/aid/delivery-displaceds/common-aid-delivery-displaceds';

function Aid_Header({ is_completed = false }: { is_completed: boolean }) {
  return (
    <Group gap={10} justify='space-between' w='100%'>
      <Group align='center' gap={5}>
        <ThemeIcon size={25} radius='xl' color='white'>
          <Package size={18} className='text-primary' />
        </ThemeIcon>
        <Text fz={{ base: 16, md: 18 }} fw={600} className='!text-primary'>
          تفاصيل المساعدة :
        </Text>
        <Badge
          color={is_completed ? 'green' : 'yellow'}
          size='lg'
          variant='filled'
          className='w-fit'
        >
          الحالة : {is_completed ? 'مكتمل' : 'قيد التنفيذ'}
        </Badge>
      </Group>

      <Button
        size='xs'
        fz={14}
        fw={500}
        c='white'
        radius='md'
        className='!bg-primary'
        rightSection={<SquarePen size={14} />}
        // onClick={() => setAction(ACTION_ADD_EDIT_DISPLAY.EDIT)}
      >
        تعديل المساعدة
      </Button>
    </Group>
  );
}

interface ManagerAidContentProps {
  isLoading: boolean;
  aid_Data: Aid;
  manager_Id: number;
  destination: MANAGER_DESTINATION_AID;
}

export default function Manager_Aid_Content({
  aid_Data,
  destination,
  manager_Id,
  isLoading,
}: ManagerAidContentProps) {
  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >((aid_Data && aid_Data?.selected_delegates_portions) ?? []);

  useEffect(() => {
    if (aid_Data?.selected_delegates_portions) {
      setSelectedDelegatesPortions(aid_Data.selected_delegates_portions);
    }
  }, [aid_Data?.selected_delegates_portions]);

  return (
    <Stack pos={'relative'}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <Aid_Header is_completed={aid_Data?.is_completed} />
      {aid_Data && <Common_Aid_Form initialData={aid_Data} isDisabled={true} />}

      <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />

      {aid_Data &&
        aid_Data?.distribution_mechanism ==
          DISTRIBUTION_MECHANISM.DELEGATES_LISTS && (
          <Common_Aid_Delegates_List
            destination={DESTINATION_AID.DISPLAY_AIDS}
            selectedDelegatesPortions={selectedDelegatesPortions}
            setSelectedDelegatesPortions={setSelectedDelegatesPortions}
            aid_Id={aid_Data.id ?? -1}
            aid_Data={aid_Data}
          />
        )}

      <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />

      {aid_Data && <Common_Aid_Delivery_Displaceds aid_Data={aid_Data} />}
    </Stack>
  );
}
