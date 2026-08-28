import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import { USER_RANK } from '@/constants/userTypes';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';

import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { getCommonComplaints } from '@/actions/actors/general/complaints/getCommonComplaints';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';


interface Props {
  params: { manager: string  };
}


export default function ManagerComplaints({ params }: Props) {
  const { manager } = params;
  const managerId = Number(manager);

  return (
    <Stack justify='center' align='center' pt={20} w='100%' px={10}>
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Common_Complaints_Content actor_Id={managerId} rank={USER_RANK.MANAGER} />
      </Suspense>
    </Stack>
  );
}
