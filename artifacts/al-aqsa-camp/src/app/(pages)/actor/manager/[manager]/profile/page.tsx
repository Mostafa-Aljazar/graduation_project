import Manager_Profile_Form from '@/components/actors/manager/profile/manager-profile-form';
import { Suspense } from 'react';

import { getManagerProfile } from '@/actions/actors/manager/profile/getManagerProfile';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';


interface Props {
  params: { manager: string  };
}


export default function ManagerProfile({ params }: Props) {
  const { manager } = params;
  const managerId = Number(manager);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Manager_Profile_Form manager_Id={managerId} />
    </Suspense>
  );
}
