import Add_Written_Content_Form from '@/components/actors/manager/ads-blogs-stories/add/written-form/add-written-content-form';
import { Suspense } from 'react';

import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';



export default function Add_Ad_Blog_Story_Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Add_Written_Content_Form />
    </Suspense>
  );
}
