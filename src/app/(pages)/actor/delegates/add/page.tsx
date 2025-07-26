import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Delegate_Profile_Form from '@/components/actors/delegate/profile/delegate-profile-form';
import React from 'react';

export default async function Delegate_Add() {
  return <Delegate_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />;
}
