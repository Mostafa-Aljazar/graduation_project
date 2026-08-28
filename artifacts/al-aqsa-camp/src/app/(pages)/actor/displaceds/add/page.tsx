import { Suspense } from 'react';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';
import { MAN } from '@/assets/actor';


export default function Displaced_Add() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Displaced_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />
    </Suspense>
  );
}
