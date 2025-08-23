import Add_Written_Content_Form from '@/components/actors/manager/ads-blogs-stories/add/written-form/add-written-content-form';
import { Suspense } from 'react';

export default function Add_Ad_Blog_Story_Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Add_Written_Content_Form />
    </Suspense>
  );
}
