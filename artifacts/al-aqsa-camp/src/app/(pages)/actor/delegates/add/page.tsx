import { Suspense } from 'react';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Delegate_Profile_Form from '@/components/actors/delegate/profile/delegate-profile-form';


export default function Delegate_Add() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Delegate_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />
    </Suspense>
  );
}
