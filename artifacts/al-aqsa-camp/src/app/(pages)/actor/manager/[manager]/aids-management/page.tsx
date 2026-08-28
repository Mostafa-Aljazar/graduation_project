import Common_Aids_Management_Page from '@/components/actors/general/aids-management/main/content/common-aids-management-page';

import { APP_URL } from '@/constants/services';
import { USER_RANK } from '@/constants/userTypes';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { getAids } from '@/actions/actors/general/aids-management/getAids';
import { TYPE_GROUP_AIDS } from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';


interface Props {
  params: { manager: string  };
  searchParams: { 'aids-tab'?: TYPE_GROUP_AIDS  };
}


export default function Manager_Aids_Management({ params }: Props) {
  const { manager } = params;
  const managerId = Number(manager);

  return <Common_Aids_Management_Page manager_Id={managerId} />;
}
