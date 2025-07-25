import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';

export default function Displaced_Add() {
  return <Displaced_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />;
}
