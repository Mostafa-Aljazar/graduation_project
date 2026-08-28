import Security_Profile_Form from '@/components/actors/security/profile/security-profile-form';
import { Suspense } from 'react';

import { getSecurityProfile } from '@/actions/actors/security/profile/getSecurityProfile';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { SECURITY_ROUTES_fUNC } from '@/constants/routes';


interface Props {
  params: { security: string  };
}


export default function SecurityProfile({ params }: Props) {
  const { security } = params;
  const securityId = Number(security);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Security_Profile_Form security_Id={securityId} />
    </Suspense>
  );
}
