import { Suspense } from 'react';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Security_Profile_Form from '@/components/actors/security/profile/security-profile-form';
import { MAN } from '@/assets/actor';


export default function Security_Add() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Security_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />
    </Suspense>
  );
}
