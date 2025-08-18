'use client';

import {
  Box,
  Stack,
  Text,
  SimpleGrid,
  LoadingOverlay,
  Button,
  TextInput,
  NativeSelect,
  Textarea,
  ActionIcon,
  Group,
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSecurityProfile } from '@/actions/actors/security/profile/getSecurityProfile';
import Image from 'next/image';
import { MAN } from '@/assets/actor';
import { SecurityProfileResponse } from '@/@types/actors/security/profile/securityProfileResponse.type';
import { useUploadThing } from '@/utils/uploadthing/uploadthing';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import {
  ACTION_ADD_EDIT_DISPLAY,
  GENDER,
  GENDER_LABELS,
  SOCIAL_STATUS,
  SOCIAL_STATUS_LABELS,
} from '@/@types/actors/common-types/index.type';
import { useForm, zodResolver } from '@mantine/form';
import {
  SecurityProfileSchema,
  SecurityProfileSchemaType,
} from '@/validation/actor/security/profile/security-profile-schema';
import { USER_RANK } from '@/constants/userTypes';
import { notifications } from '@mantine/notifications';
import {
  updateSecurityProfile,
  UpdateSecurityProfileProps,
} from '@/actions/actors/security/profile/updateSecurityProfile';
import {
  addNewSecurity,
  AddNewSecurityProps,
} from '@/actions/actors/security/profile/addNewSecurity';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { handleUploadMedia } from '@/utils/uploadthing/handleUploadMedia';
import { Camera, Save, UserPen } from 'lucide-react';
import { Custom_Phone_Input } from '@/components/common/custom/Custom_Phone_Input';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Upload_Media from '../../common/upload-files/Upload_Media';

interface SecurityProfileFormProps {
  security_Id?: number;
  destination?: ACTION_ADD_EDIT_DISPLAY;
}

export default function Security_Profile_Form({
  security_Id,
  destination,
}: SecurityProfileFormProps) {
  const queryClient = useQueryClient();

  const { startUpload } = useUploadThing('mediaUploader');
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | string | null>(MAN.src);

  const { isSecurityOfficer, isSecurity, isManager, user } = useAuth();
  const isOwner = isSecurity && user?.id === security_Id;

  const router = useRouter();

  const [query, setQuery] = useQueryState(
    'action',
    parseAsStringEnum<ACTION_ADD_EDIT_DISPLAY>(Object.values(ACTION_ADD_EDIT_DISPLAY)).withDefault(
      destination ?? ACTION_ADD_EDIT_DISPLAY.DISPLAY
    )
  );

  const isAddMode = (isManager || isSecurityOfficer) && destination === ACTION_ADD_EDIT_DISPLAY.ADD;
  const isEditMode =
    (isManager || isSecurityOfficer || isOwner) && query === ACTION_ADD_EDIT_DISPLAY.EDIT;
  const isDisplayMode =
    query === ACTION_ADD_EDIT_DISPLAY.DISPLAY && destination !== ACTION_ADD_EDIT_DISPLAY.ADD;

  const form = useForm<SecurityProfileSchemaType>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      identity: '',
      gender: GENDER.MALE,
      nationality: '',
      phone_number: '',
      profile_image: null,
      alternative_phone_number: '',
      social_status: SOCIAL_STATUS.SINGLE,
      rank: USER_RANK.SECURITY,
      additional_notes: '',
    },
    validate: zodResolver(SecurityProfileSchema),
    validateInputOnChange: true,
  });

  const {
    data: securityProfileData,
    isLoading: isLoadingFetch,
    refetch,
  } = useQuery<SecurityProfileResponse>({
    queryKey: ['security-profile', security_Id],
    queryFn: () => getSecurityProfile({ security_Id: security_Id as number }),
    enabled: !!security_Id && (isDisplayMode || isEditMode),
  });

  const applyData = ({ securityData }: { securityData: SecurityProfileResponse | undefined }) => {
    if (!isAddMode && securityData && securityData.status === 200 && securityData.user) {
      const userData = securityData.user;
      setProfileImage(MAN.src || userData.profile_image || MAN.src);

      form.setValues({
        name: userData.name,
        email: userData.email || '',
        identity: userData.identity,
        gender: userData.gender,
        nationality: userData.nationality,
        profile_image: userData.profile_image || null,
        phone_number:
          userData.phone_number.length === 10
            ? `+970${userData.phone_number}`
            : userData.phone_number,
        alternative_phone_number:
          userData.alternative_phone_number?.length === 10
            ? `+970${userData.alternative_phone_number}`
            : userData.alternative_phone_number || '',
        social_status: userData.social_status || SOCIAL_STATUS.SINGLE,
        rank: userData.rank || USER_RANK.SECURITY,
        additional_notes: userData.additional_notes || '',
      });
      form.clearErrors();
      form.resetTouched();
      form.resetDirty();
    } else if (isAddMode) {
      form.reset();
      setProfileImage(MAN.src);
    }
  };

  useEffect(() => {
    applyData({ securityData: securityProfileData });
  }, [securityProfileData, isAddMode]);

  useEffect(() => {
    if (profileImage instanceof File) {
      const objectUrl = URL.createObjectURL(profileImage);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImage]);

  const updateSecurityProfileMutation = useMutation<
    SecurityProfileResponse,
    Error,
    UpdateSecurityProfileProps
  >({
    mutationFn: updateSecurityProfile,
    onSuccess: (data) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY);
      if (data.status === 200) {
        notifications.show({
          title: 'تم التحديث',
          message: 'تم تحديث الملف الشخصي للأمن بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        applyData({ securityData: data });
        refetch();
        queryClient.invalidateQueries({ queryKey: ['security-profile'] });
      } else {
        throw new Error(data.error || 'فشل في تحديث الملف الشخصي للأمن');
      }
    },
    onError: (error) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY);
      const errorMessage = error?.message || 'حدث خطأ أثناء تحديث الملف الشخصي للأمن';
      form.setErrors({ general: errorMessage });
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const addSecurityProfileMutation = useMutation<
    SecurityProfileResponse,
    Error,
    AddNewSecurityProps
  >({
    mutationFn: addNewSecurity,
    onSuccess: (data) => {
      if (data.status === 201) {
        notifications.show({
          title: 'تم الإضافة',
          message: 'تمت إضافة أمن جديد بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        queryClient.invalidateQueries({ queryKey: ['securities'] });
        router.push(GENERAL_ACTOR_ROUTES.SECURITIES);
      } else {
        throw new Error(data.error || 'فشل في إضافة الأمن الجديد');
      }
    },
    onError: (error) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY);
      const errorMessage = error?.message || 'حدث خطأ أثناء إضافة الأمن الجديد';
      form.setErrors({ general: errorMessage });
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const uploadImages = async (file: File | null): Promise<string | null> => {
    if (!file) return null;
    try {
      setUploading(true);
      const mediaUrl = await handleUploadMedia(file, startUpload);
      if (!mediaUrl) throw new Error('فشل في رفع الصورة. يرجى المحاولة مرة أخرى.');
      return mediaUrl;
    } catch {
      notifications.show({
        title: 'فشل الرفع',
        message: 'فشل في رفع الصورة. يرجى المحاولة مرة أخرى.',
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = form.onSubmit(async (values: SecurityProfileSchemaType) => {
    console.log('🚀 ~ Security_Profile_Form ~ values:', values);
    const avatarUrl =
      profileImage instanceof File
        ? await uploadImages(profileImage)
        : (profileImage as string | null) ?? null;

    const payload: SecurityProfileSchemaType = {
      ...values,
      profile_image: avatarUrl,
    };

    const handleError = (error: unknown) => {
      const errorMessage = (error as Error)?.message || 'فشل في حفظ الملف الشخصي للأمن';
      form.setErrors({ general: errorMessage });
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    };

    try {
      if (isAddMode) {
        addSecurityProfileMutation.mutate({ payload }, { onError: handleError });
      }
      if (isEditMode) {
        updateSecurityProfileMutation.mutate(
          { security_Id: security_Id as number, payload },
          { onError: handleError }
        );
      }
    } catch (error) {
      handleError(error);
    }
  });

  const isMutationLoading =
    updateSecurityProfileMutation.isPending || addSecurityProfileMutation.isPending;

  return (
    <Stack p={{ base: 10, md: 20 }} pos='relative'>
      <LoadingOverlay
        visible={isLoadingFetch || isMutationLoading || uploading}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <Box
        w='100%'
        h={80}
        className='!relative !bg-gradient-to-l !from-primary !via-second !to-white !rounded-[20px]'
      >
        <Box
          pos='absolute'
          bottom='-50%'
          left='50%'
          className='bg-primary border-1 border-second !rounded-full !overflow-hidden !-translate-x-1/2'
          w={100}
          h={100}
        >
          {profileImage ? (
            profileImage instanceof File ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt='Avatar'
                className='w-[100px] h-[100px] !object-contain'
              />
            ) : (
              <img
                src={profileImage}
                alt='Avatar'
                className='w-[100px] h-[100px] !object-contain'
              />
            )
          ) : (
            <Image src={MAN} alt='Avatar' className='w-[100px] h-[100px]' priority />
          )}
          {(isEditMode || isAddMode) && (
            <Upload_Media File_Type='image' setFileObject={setProfileImage}>
              <ActionIcon
                variant='outline'
                color='gray.5'
                radius='100%'
                pos='absolute'
                left='50%'
                top='50%'
                w={30}
                h={30}
                className='border-1 border-gray rounded-full -translate-x-1/2 -translate-y-1/2'
                component='label'
              >
                <Camera size={20} />
              </ActionIcon>
            </Upload_Media>
          )}
        </Box>
      </Box>

      <Stack my={30}>
        <form onSubmit={handleSubmit}>
          <Group wrap='nowrap' align='center'>
            <Text ta='start' fz={18} fw={600} className='!text-primary'>
              {isAddMode ? 'إضافة أمن جديد :' : 'البيانات الشخصية :'}
            </Text>
            {(isManager || isSecurityOfficer || isOwner) && isDisplayMode && (
              <Button
                variant='filled'
                size='xs'
                color='primary'
                rightSection={<UserPen size={16} />}
                loading={isMutationLoading}
                onClick={() => setQuery(ACTION_ADD_EDIT_DISPLAY.EDIT)}
                fw={500}
                fz={16}
                className='shadow-sm'
              >
                تعديل
              </Button>
            )}
          </Group>

          <SimpleGrid
            cols={{ base: 1, md: 3 }}
            my={20}
            w='100%'
            className='bg-gray-50 shadow-md rounded-lg'
            p={16}
          >
            <TextInput
              label={
                <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                  الاسم :
                </Text>
              }
              placeholder='ادخل الاسم...'
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('name')}
              disabled={isDisplayMode}
            />

            <TextInput
              type='email'
              label={
                <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                  البريد الإلكتروني :
                </Text>
              }
              placeholder='ادخل البريد الإلكتروني...'
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('email')}
              disabled={isDisplayMode}
            />

            <TextInput
              label={
                <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                  رقم الهوية :
                </Text>
              }
              placeholder='ادخل رقم الهوية...'
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('identity')}
              disabled={isDisplayMode}
            />

            <NativeSelect
              label={
                <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                  الجنس :
                </Text>
              }
              data={Object.entries(GENDER).map(([key, value]) => ({
                value,
                label: GENDER_LABELS[value as GENDER],
              }))}
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('gender')}
              disabled={isDisplayMode}
            />

            <TextInput
              label={
                <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                  الجنسية :
                </Text>
              }
              placeholder='ادخل الجنسية...'
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('nationality')}
              disabled={isDisplayMode}
            />

            <NativeSelect
              label={
                <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                  الحالة الاجتماعية :
                </Text>
              }
              data={Object.entries(SOCIAL_STATUS).map(([key, value]) => ({
                value,
                label: SOCIAL_STATUS_LABELS[value as SOCIAL_STATUS],
              }))}
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('social_status')}
              disabled={isDisplayMode}
            />

            <Stack w='100%' gap={0}>
              <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                رقم الجوال :
              </Text>
              <Box dir='ltr' className='w-full'>
                <PhoneInput
                  name='phone_number'
                  international
                  countryCallingCodeEditable={true}
                  defaultCountry='PS'
                  inputComponent={Custom_Phone_Input}
                  placeholder='ادخل رقم الجوال...'
                  value={form.getValues().phone_number as string}
                  key={form.key('phone_number')}
                  {...form.getInputProps('phone_number')}
                  disabled={isDisplayMode}
                />
              </Box>
            </Stack>

            {(isEditMode ||
              isAddMode ||
              (form.getValues().alternative_phone_number &&
                form.getValues().alternative_phone_number !== '')) && (
              <Stack w='100%' gap={0}>
                <Text fz={16} fw={500} mb={4} className='!text-black !text-nowrap'>
                  رقم بديل :
                </Text>
                <Box dir='ltr' className='w-full'>
                  <PhoneInput
                    name='alternative_phone_number'
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry='PS'
                    inputComponent={Custom_Phone_Input}
                    placeholder='ادخل رقم بديل...'
                    value={form.getValues().alternative_phone_number as string}
                    key={form.key('alternative_phone_number')}
                    {...form.getInputProps('alternative_phone_number')}
                    disabled={isDisplayMode}
                  />
                </Box>
              </Stack>
            )}
          </SimpleGrid>

          {isEditMode ||
            isAddMode ||
            (form.getValues().additional_notes && form.getValues().additional_notes !== '' && (
              <Box className='bg-gray-50 shadow-md rounded-lg' p={16}>
                <Textarea
                  label={
                    <Text fz={18} fw={600} mb={4} className='!text-primary !text-nowrap'>
                      ملاحظات إضافية :
                    </Text>
                  }
                  placeholder='ادخل ملاحظات إضافية...'
                  size='sm'
                  w='100%'
                  classNames={{
                    input:
                      'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
                  }}
                  {...form.getInputProps('additional_notes')}
                  disabled={isDisplayMode}
                />
              </Box>
            ))}

          {(isEditMode || isAddMode) && (
            <Group justify='center' w={'100%'} mt={20}>
              <Button
                type='submit'
                variant='filled'
                size='xs'
                color='primary'
                loading={isMutationLoading}
                fw={500}
                fz={16}
                className='shadow-sm'
                rightSection={isEditMode ? <UserPen size={16} /> : <Save size={16} />}
              >
                {isAddMode ? 'إضافة' : 'حفظ التعديلات'}
              </Button>
            </Group>
          )}
        </form>
      </Stack>
    </Stack>
  );
}
