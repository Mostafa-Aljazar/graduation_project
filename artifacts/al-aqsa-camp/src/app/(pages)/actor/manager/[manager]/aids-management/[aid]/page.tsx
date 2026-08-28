import Manager_Aid_Page from '@/components/actors/manager/aids-management/aid/manager-aid-page';

import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { USER_RANK } from '@/constants/userTypes';
import { FAVICON } from '@/assets/common';
import { Suspense } from 'react';


interface Props {
  params: { manager: string; aid: string  };
}


export default function Manager_Aid({ params }: Props) {
  const { manager, aid } = params;
  const managerId = Number(manager);
  const aidId = Number(aid);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Aid_Page manager_Id={managerId} aid_Id={aidId} />
    </Suspense>
  );
}
