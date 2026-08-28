import Manager_Add_Aid_Page from '@/components/actors/manager/aids-management/add/page/manager-add-aid-page';
import { Suspense } from 'react';

import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';


interface Props {
  params: { manager: string  };
}


export default function Manager_Add_Aid({ params }: Props) {
  const { manager } = params;
  const managerId = Number(manager);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Add_Aid_Page manager_Id={managerId} />
    </Suspense>
  );
}
