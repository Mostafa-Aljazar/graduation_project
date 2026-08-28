import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';
import { Suspense } from 'react';

import { getDisplacedProfile } from '@/actions/actors/displaced/profile/getDisplacedProfile';
import { APP_URL } from '@/constants/services';
import { DISPLACED_ROUTES_fUNC } from '@/constants/routes';
import { MAN } from '@/assets/actor';


interface Props {
  params: { displaced: string  };
}


export default function DisplacedProfile({ params }: Props) {
  const { displaced } = params;
  const displacedId = Number(displaced);

  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Displaced_Profile_Form displaced_Id={displacedId} />
    </Suspense>
  );
}
