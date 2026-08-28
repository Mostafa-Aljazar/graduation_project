import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import { Stack } from '@mantine/core';

import { APP_URL } from '@/constants/services';
import { getCommonComplaints } from '@/actions/actors/general/complaints/getCommonComplaints';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';
import { SECURITY_ROUTES_fUNC } from '@/constants/routes';


interface Props {
  params: { security: string  };
  searchParams: { 'complaints-tab'?: COMPLAINTS_TABS  };
}


export default function SecurityComplaints({ params }: Props) {
  const { security } = params;
  const securityId = Number(security);

  return (
    <Stack justify='center' align='center' pt={20} w='100%' px={10}>
      <Common_Complaints_Header_Tabs />
      <Common_Complaints_Content actor_Id={securityId} rank='SECURITY' />
    </Stack>
  );
}
