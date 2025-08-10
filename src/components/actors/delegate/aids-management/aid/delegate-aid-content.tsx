'use state';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { Stack, Divider, LoadingOverlay } from '@mantine/core';

import Common_Aid_Delivery_Displaceds from '../../../general/aids-management/aid/delivery-displaceds/common-aid-delivery-displaceds';
import Delegate_Aid_Info from '../common/delegate-aid-info';

interface DelegateAidContentProps {
  isLoading: boolean;
  aid_Data: Aid;
  delegate_Id: number;
}

export default function Delegate_Aid_Content({
  aid_Data,
  isLoading,
}: DelegateAidContentProps) {
  return (
    <Stack pos={'relative'}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      {aid_Data && <Delegate_Aid_Info aid_Data={aid_Data} />}

      <Divider h={1} className='!bg-primary' />

      {aid_Data && <Common_Aid_Delivery_Displaceds aid_Data={aid_Data} />}
    </Stack>
  );
}
