import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Security_Profile_Form from '@/components/actors/security/profile/security-profile-form';
import { Suspense } from 'react';

export default function Security_Add() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Security_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />;
    </Suspense>
  );
}
