import Delegate_Aid_Add_Displaceds_Page from '@/components/actors/delegate/aids-management/add-displaceds/delegate-aid-add-displaceds-page';

import { APP_URL } from '@/constants/services';
import { USER_RANK } from '@/constants/userTypes';
import { DELEGATE_ROUTES_fUNC, GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { FAVICON } from '@/assets/common';


interface Props {
  params: { delegate: string; aid: string  };
}


export default function Delegate_Add_Displaceds_Aid({ params }: Props) {
  const { delegate, aid } = params;
  const delegateId = Number(delegate);
  const aidId = Number(aid);

  return <Delegate_Aid_Add_Displaceds_Page delegate_Id={delegateId} aid_Id={aidId} />;
}
