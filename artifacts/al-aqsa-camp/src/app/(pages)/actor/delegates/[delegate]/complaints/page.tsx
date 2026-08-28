
import { getCommonComplaints } from '@/actions/actors/general/complaints/getCommonComplaints';
import { USER_RANK } from '@/constants/userTypes';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/@types/actors/common-types/index.type';
import { APP_URL } from '@/constants/services';
import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';


interface Props {
  params: { delegate: string  };
  searchParams: { 'complaints-tab'?: COMPLAINTS_TABS  };
}


export default function DelegateComplaints({ params }: Props) {
  const { delegate } = params;
  const delegateId = Number(delegate);

  return (
    <Stack justify='center' align='center' pt={20} w='100%' px={10}>
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Common_Complaints_Header_Tabs />
      </Suspense>

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Common_Complaints_Content actor_Id={delegateId} rank={USER_RANK.DELEGATE} />
      </Suspense>
    </Stack>
  );
}
