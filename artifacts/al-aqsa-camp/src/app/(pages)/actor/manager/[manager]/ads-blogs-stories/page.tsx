import Ads_Blogs_Stories_Page from '@/components/actors/manager/ads-blogs-stories/main/content/ads-blogs-stories-page';
import { Suspense } from 'react';

import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';


interface Props {
  params: { manager: string  };
}


export default function Ads_Blogs_Stories({ params }: Props) {
  const { manager } = params;
  const managerId = Number(manager);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ads_Blogs_Stories_Page manager_Id={managerId} />
    </Suspense>
  );
}
