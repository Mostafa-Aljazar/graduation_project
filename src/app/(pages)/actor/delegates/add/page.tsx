import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Delegate_Profile_Form from '@/components/actors/delegate/profile/delegate-profile-form';
import React, { Suspense } from 'react';

export default async function Delegate_Add() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Delegate_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />
      </Suspense>
    </>
  );
}
