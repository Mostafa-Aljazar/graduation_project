import Delegate_Profile_Form from '@/components/actors/delegate/profile/delegate-profile-form';
import { Suspense } from 'react';

import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { getDelegateProfile } from '@/actions/actors/delegates/profile/getDelegateProfile';
import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';


interface Props {
  params: { delegate: string  };
}


export default function DelegateProfile({ params }: Props) {
  const { delegate } = params;
  const delegateId = Number(delegate);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Delegate_Profile_Form delegate_Id={delegateId} />
    </Suspense>
  );
}
