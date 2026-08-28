import Common_Aids_Management_Page from '@/components/actors/general/aids-management/main/content/common-aids-management-page';

import { APP_URL } from '@/constants/services';
import { USER_RANK } from '@/constants/userTypes';
import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';
import { getAids } from '@/actions/actors/general/aids-management/getAids';
import { TYPE_GROUP_AIDS } from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';


interface Props {
  params: { delegate: string  };
  searchParams: { 'aids-tab'?: TYPE_GROUP_AIDS  };
}


export default function DelegateAidsManagement({ params }: Props) {
  const { delegate } = params;
  const delegateId = Number(delegate);

  return <Common_Aids_Management_Page delegate_Id={delegateId} />;
}
