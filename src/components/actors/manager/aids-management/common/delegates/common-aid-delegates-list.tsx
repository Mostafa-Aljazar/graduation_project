import { Group, Stack, Text } from '@mantine/core';
import { Database } from 'lucide-react';
import { Dispatch, SetStateAction, Suspense } from 'react';
import { DESTINATION_AID } from '@/@types/actors/common-types/index.type';
import {
  Aid,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import Common_Aid_Delegates_Table from './common-aid-delegates-table';

function Aid_Delegates_List_Header({
  destination,
}: {
  destination: DESTINATION_AID;
}) {
  const title =
    destination == DESTINATION_AID.ADD_AIDS
      ? 'إضافة مناديب للمساعدة'
      : destination == DESTINATION_AID.EDIT_AIDS
      ? 'تعديل المناديب المستقبلين '
      : destination == DESTINATION_AID.DISPLAY_AIDS
      ? 'بيانات المناديب'
      : '';

  return (
    <Group justify='right' align='center'>
      <Group gap={10}>
        <Database size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          {title} :
        </Text>
      </Group>
    </Group>
  );
}

interface CommonAidDelegatesListProps {
  aid_Id?: number;
  destination: DESTINATION_AID;
  selectedDelegatesPortions: SelectedDelegatePortion[];
  setSelectedDelegatesPortions: Dispatch<
    SetStateAction<SelectedDelegatePortion[]>
  >;
  aid_Data?: Aid;
}

export default function Common_Aid_Delegates_List({
  destination,
  selectedDelegatesPortions,
  setSelectedDelegatesPortions,
  aid_Data,
  aid_Id,
}: CommonAidDelegatesListProps) {
  return (
    <Stack p={10} pos='relative' w='100%'>
      <Aid_Delegates_List_Header destination={destination} />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Common_Aid_Delegates_Table
          destination={destination}
          selectedDelegatesPortions={selectedDelegatesPortions}
          setSelectedDelegatesPortions={setSelectedDelegatesPortions}
          aid_Data={aid_Data as Aid}
          aid_Id={aid_Id}
        />
      </Suspense>
    </Stack>
  );
}
