'use client';
import {
  ActionIcon,
  Box,
  Button,
  LoadingOverlay,
  NativeSelect,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useForm, zodResolver } from '@mantine/form';
import {
  delegateProfileType,
  delegateProfileSchema,
  delegateUpdatePayload,
} from '@/validation/actor/delegate/profileSchema';
import '@mantine/core/styles.css';
import { Camera, Save, UserPen } from 'lucide-react';
import { Custom_Phone_Input } from '@/components/common/custom/Custom_Phone_Input';
import { useUploadThing } from '@/utils/uploadthing/uploadthing';
import { useEffect, useState } from 'react';
import { handleUploadMedia } from '@/utils/uploadthing/handleUploadMedia';
import { notifications } from '@mantine/notifications';
import Upload_Media from '@/components/actors/common/upload-files/Upload_Media';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateDelegateProfile } from '@/actions/actors/delegate/profile/updateProfileInfo';
import { getDelegateProfile } from '@/actions/actors/delegate/profile/getProfileInfo';
import useAuth from '@/hooks/useAuth';
import { MAN } from '@/assets/actor';
import { DelegateProfileResponse } from '@/@types/actors/delegate/profile/profileResponse.type';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants'; // Assuming ACTION_ADD_EDIT_DISPLAY is defined here
import { addNewDelegate } from '@/actions/actors/delegate/profile/addNewDelegate';
import { useRouter } from 'next/navigation';
import {
  AUTH_ROUTES,
  GENERAL_ACTOR_ROUTES,
  LANDING_ROUTES,
} from '@/constants/routes';
import {
  GENDER,
  GENDER_LABELS,
  MATERIAL_STATUS,
  MATERIAL_STATUS_LABELS,
} from '@/content/actor/delegate/profile-form';

interface DelegateProfileFormProps {
  delegate_ID?: number;
}

export default function Delegate_Profile_Form({
  delegate_ID,
}: DelegateProfileFormProps) {
  console.log('🚀 ~ delegate_ID:', delegate_ID);
  const { startUpload } = useUploadThing('mediaUploader');
  const [avatarImage, setAvatarImage] = useState<File | string | null>(MAN.src);
  const [uploading, setUploading] = useState(false);
  const { isAuthenticated, isDelegate, isManager } = useAuth(); // Get isManager from useAuth
  const router = useRouter();

  const [query, setQuery] = useQueryState(
    'action',
    parseAsStringEnum<ACTION_ADD_EDIT_DISPLAY>(
      Object.values(ACTION_ADD_EDIT_DISPLAY)
    ).withDefault(ACTION_ADD_EDIT_DISPLAY.DISPLAY)
  );

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace(AUTH_ROUTES.LOGIN);
  //   }
  // }, []);

  // Determine if it's an 'add' operation (only for managers)
  const isAddMode = isManager && query === ACTION_ADD_EDIT_DISPLAY.ADD;
  // Determine if it's an 'edit' mode (for delegates and managers)
  const isEditMode = query === ACTION_ADD_EDIT_DISPLAY.EDIT;
  // Determine if it's a 'display' mode
  const isDisplayMode = query === ACTION_ADD_EDIT_DISPLAY.DISPLAY;

  // Form setup
  const form = useForm<delegateProfileType>({
    mode: 'uncontrolled',
    initialValues: {
      avatar: null, // Default to null for new entries
      name: '',
      idNumber: 0,
      gender: GENDER.MALE,
      maritalStatus: MATERIAL_STATUS.SINGLE,
      nationality: '',
      email: '',
      age: 0,
      education: '',
      mobileNumber: '',
      alternativeNumber: '',
      numberOfResponsibleCamps: 0, // Keep for initial display/default for new
      numberOfFamilies: 0, // Keep for initial display/default for new
    },
    validate: zodResolver(delegateProfileSchema),
    validateInputOnChange: true,
  });

  // Fetch initial profile data ONLY if not in 'add' mode
  const {
    data: profileData,
    isLoading,
    refetch,
  } = useQuery<DelegateProfileResponse>({
    queryKey: ['delegateProfile', delegate_ID], // Include delegate_ID in queryKey for re-fetching when it changes
    queryFn: () => getDelegateProfile({ delegate_ID: Number(delegate_ID) }), // Pass object with delegate_ID    queryFn: getDelegateProfile,
    enabled: isDisplayMode || isEditMode || !!delegate_ID,
  });
  console.log('🚀 ~ profileData:', profileData);

  // Handle profile data and errors for existing profiles
  useEffect(() => {
    if (
      !isAddMode &&
      profileData &&
      profileData.status === '200' &&
      profileData.user
    ) {
      setAvatarImage(profileData.user.avatar || MAN.src);
      form.setFieldValue('name', profileData.user.name);
      form.setFieldValue('idNumber', profileData.user.idNumber);
      form.setFieldValue('gender', profileData.user.gender);
      form.setFieldValue('maritalStatus', profileData.user.maritalStatus);
      form.setFieldValue('nationality', profileData.user.nationality);
      form.setFieldValue('email', profileData.user.email);
      form.setFieldValue('age', profileData.user.age);
      form.setFieldValue('education', profileData.user.education);
      if (profileData.user.mobileNumber.length == 10) {
        form.setFieldValue(
          'mobileNumber',
          `+97${profileData.user.mobileNumber}`
        );
      } else {
        form.setFieldValue('mobileNumber', profileData.user.mobileNumber);
      }

      if (
        profileData.user.alternativeNumber &&
        profileData.user.alternativeNumber.length == 10
      ) {
        form.setFieldValue(
          'alternativeNumber',
          `+97${profileData.user.alternativeNumber}` || ''
        );
      } else {
        form.setFieldValue(
          'alternativeNumber',
          profileData.user.alternativeNumber || ''
        );
      }

      // Set read-only fields from backend
      form.setFieldValue(
        'numberOfResponsibleCamps',
        profileData.user.numberOfResponsibleCamps || 0
      );
      form.setFieldValue(
        'numberOfFamilies',
        profileData.user.numberOfFamilies || 0
      );
    }
    if (!isAddMode && profileData && profileData.status !== '200') {
      const errorMessage =
        profileData?.error || 'فشل في تحميل بيانات الملف الشخصي للمندوب';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    }
    // If in 'add' mode, clear the form for a new entry
    if (isAddMode) {
      form.reset();
      form.clearErrors();

      setAvatarImage(MAN.src); // Reset avatar to default
    }
  }, [profileData, isAddMode]); // Added form to dependencies

  // Clean up URL.createObjectURL to prevent memory leaks
  useEffect(() => {
    if (avatarImage instanceof File) {
      const objectUrl = URL.createObjectURL(avatarImage);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatarImage]);

  // Mutation for updating profile
  const updateProfileMutation = useMutation<
    DelegateProfileResponse,
    Error,
    delegateUpdatePayload
  >({
    mutationFn: updateDelegateProfile,
    onSuccess: (data) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY); // Go back to display mode

      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم التحديث',
          message: 'تم تحديث الملف الشخصي للمندوب بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        form.setValues({
          name: data.user.name,
          idNumber: data.user.idNumber,
          gender: data.user.gender,
          maritalStatus: data.user.maritalStatus,
          nationality: data.user.nationality,
          email: data.user.email,
          age: data.user.age,
          education: data.user.education,
          mobileNumber: data.user.mobileNumber,
          alternativeNumber: data.user.alternativeNumber || '',
          numberOfResponsibleCamps: data.user.numberOfResponsibleCamps,
          numberOfFamilies: data.user.numberOfFamilies,
        });
        setAvatarImage(data.user.avatar || MAN.src);
        refetch(); // Re-fetch data to ensure UI is in sync with backend
      } else {
        throw new Error(data.error || 'فشل في تحديث الملف الشخصي للمندوب');
      }
    },
    onError: (error: any) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY); // Go back to display mode even on error

      const errorMessage =
        error?.message || 'حدث خطأ أثناء تحديث الملف الشخصي للمندوب';
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

  // Mutation for adding new delegate
  const addDelegateMutation = useMutation<
    DelegateProfileResponse,
    Error,
    delegateUpdatePayload
  >({
    mutationFn: addNewDelegate,
    onSuccess: (data) => {
      if (Number(data.status) === 201) {
        // 201 Created
        notifications.show({
          title: 'تم الإضافة',
          message: 'تم إضافة المندوب الجديد بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
        // form.reset(); // Clear the form after successful addition
        // setAvatarImage(MAN.src); // Reset avatar to default
        // Optionally, refetch delegate list or navigate
        // setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY); // Go back to display mode
        router.push(GENERAL_ACTOR_ROUTES.DELEGATES);
      } else {
        throw new Error(data.error || 'فشل في إضافة المندوب الجديد');
      }
    },
    onError: (error: any) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY); // Go back to display mode even on error

      const errorMessage =
        error?.message || 'حدث خطأ أثناء إضافة المندوب الجديد';
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

  // Handle image uploads (same as before)
  const uploadImages = async (file: File | null): Promise<string | null> => {
    if (!file) return null;
    try {
      setUploading(true); // Start uploading indicator
      const mediaUrl = await handleUploadMedia(file, startUpload);
      if (!mediaUrl) {
        throw new Error('فشل في رفع الصورة. يرجى المحاولة مرة أخرى.');
      }
      return mediaUrl;
    } catch (error) {
      notifications.show({
        title: 'فشل الرفع',
        message: 'فشل في رفع الصورة. يرجى المحاولة مرة أخرى.',
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
      return null;
    } finally {
      setUploading(false); // End uploading indicator
    }
  };

  // Handle form submission
  const handleSubmit = form.onSubmit(async (values: delegateProfileType) => {
    try {
      const avatarUrl =
        avatarImage && avatarImage instanceof File
          ? await uploadImages(avatarImage)
          : (avatarImage as string | null); // Cast to string | null

      // Construct the payload for updateDelegateProfile or addNewDelegate
      const payload: delegateUpdatePayload = {
        name: values.name,
        idNumber: values.idNumber,
        gender: values.gender,
        maritalStatus: values.maritalStatus,
        nationality: values.nationality,
        email: values.email,
        age: values.age,
        education: values.education,
        mobileNumber: values.mobileNumber,
        alternativeNumber: values.alternativeNumber,
        avatar: avatarUrl ?? null, // Ensure avatar is string or null
      };

      if (isAddMode) {
        addDelegateMutation.mutate(payload);
      } else if (isEditMode) {
        updateProfileMutation.mutate(payload);
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'فشل في حفظ الملف الشخصي للمندوب';
      form.setErrors({ general: errorMessage });
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    }
  });

  // Determine loading state from either mutation
  const isMutationLoading =
    updateProfileMutation.isPending || addDelegateMutation.isPending;

  return (
    <Stack p={10} pos={'relative'}>
      <LoadingOverlay
        visible={isLoading || isMutationLoading || uploading}
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
          {avatarImage ? (
            <img
              src={
                avatarImage instanceof File
                  ? URL.createObjectURL(avatarImage)
                  : avatarImage
              }
              alt='Avatar'
              className='w-[100px] h-[100px] !object-contain'
            />
          ) : (
            <Image
              src={MAN}
              alt='Avatar'
              className='w-[100px] h-[100px]'
              priority
            />
          )}
          {(isEditMode || isAddMode) && (
            <Upload_Media File_Type='image' setFileObject={setAvatarImage}>
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
        <Text w='100%' ta='start' fz={24} fw={600} className='!text-primary'>
          {isAddMode ? 'إضافة مندوب جديد:' : 'بياناتي الشخصية:'}
        </Text>
        <form className='flex flex-col items-center w-full'>
          <SimpleGrid
            cols={{ base: 1, md: 2, lg: 3 }}
            verticalSpacing='sm'
            w={'100%'}
          >
            {/* Name */}
            <TextInput
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  الاسم :
                </Text>
              }
              placeholder='ادخل الاسم...'
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('name')}
              {...form.getInputProps('name')}
              disabled={isDisplayMode}
            />
            {/* ID Number */}
            <NumberInput
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  رقم الهوية :
                </Text>
              }
              placeholder='ادخل رقم الهوية...'
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              maxLength={9}
              min={0}
              allowDecimal={false}
              key={form.key('idNumber')}
              {...form.getInputProps('idNumber')}
              disabled={isDisplayMode}
            />
            {/* Gender */}
            <NativeSelect
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  الجنس :
                </Text>
              }
              data={Object.entries(GENDER).map(([key, value]) => ({
                value: value,
                label: GENDER_LABELS[value],
              }))}
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('gender')}
              {...form.getInputProps('gender')}
              disabled={isDisplayMode}
            />
            <NativeSelect
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  الحالة الاجتماعية :
                </Text>
              }
              data={Object.entries(MATERIAL_STATUS).map(([key, value]) => ({
                value: value,
                label: MATERIAL_STATUS_LABELS[value],
              }))}
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('maritalStatus')}
              {...form.getInputProps('maritalStatus')}
              disabled={isDisplayMode}
            />
            <TextInput
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  الجنسية :
                </Text>
              }
              placeholder='ادخل الجنسية...'
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('nationality')}
              {...form.getInputProps('nationality')}
              disabled={isDisplayMode}
            />

            <TextInput
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  البريد الإلكتروني :
                </Text>
              }
              type='email'
              placeholder='example@gmail.com'
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('email')}
              {...form.getInputProps('email')}
              disabled={isDisplayMode}
            />

            <NumberInput
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  العمر :
                </Text>
              }
              placeholder='ادخل العمر...'
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              // min={18}
              // max={100}
              defaultValue={isEditMode ? profileData?.user.age : 0}
              allowDecimal={false}
              key={form.key('age')}
              {...form.getInputProps('age')}
              disabled={isDisplayMode}
            />

            <TextInput
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  المؤهل العلمي :
                </Text>
              }
              placeholder='ادخل المؤهل العلمي...'
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('education')}
              {...form.getInputProps('education')}
              disabled={isDisplayMode}
            />

            <Stack w='100%' gap={0}>
              <Text
                fz={18}
                fw={500}
                w={'100%'}
                className='!text-dark !text-nowrap'
              >
                رقم الجوال :
              </Text>
              <Box dir='ltr' className='w-full'>
                <PhoneInput
                  name='mobileNumber'
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry='PS'
                  inputComponent={Custom_Phone_Input}
                  placeholder='ادخل رقم الجوال...'
                  value={form.getValues().mobileNumber as string}
                  key={form.key('mobileNumber')}
                  {...form.getInputProps('mobileNumber')}
                  disabled={isDisplayMode}
                />
              </Box>
            </Stack>

            {isEditMode ||
            isAddMode || // Allow entry in edit/add mode
            (profileData?.user.alternativeNumber &&
              profileData.user.alternativeNumber !== '') ? ( // Or display if exists
              <Stack w='100%' gap={0}>
                <Text
                  fz={18}
                  fw={500}
                  w='100%'
                  className='!text-dark !text-nowrap'
                >
                  رقم بديل :
                </Text>
                <Box dir='ltr' className='w-full'>
                  <PhoneInput
                    name='alternativeNumber'
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry='PS'
                    inputComponent={Custom_Phone_Input}
                    placeholder='ادخل رقم بديل...'
                    value={form.getValues().alternativeNumber as string}
                    key={form.key('alternativeNumber')}
                    {...form.getInputProps('alternativeNumber')}
                    disabled={isDisplayMode}
                  />
                </Box>
              </Stack>
            ) : null}

            {/* Number of Responsible Camps - READ-ONLY, only visible in display/edit mode for existing profiles */}
            {!isAddMode && (
              <TextInput
                label={
                  <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                    عدد المخيمات المسؤولة :
                  </Text>
                }
                // value={form.values.numberOfResponsibleCamps.toString()}
                size='sm'
                w='100%'
                classNames={{
                  input: 'placeholder:!text-sm !text-primary !font-medium',
                }}
                disabled // Always disabled as it's read-only
                key={form.key('numberOfResponsibleCamps')}
                {...form.getInputProps('numberOfResponsibleCamps')}
              />
            )}
            {/* Number of Families - READ-ONLY, only visible in display/edit mode for existing profiles */}
            {!isAddMode && (
              <TextInput
                label={
                  <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                    عدد العائلات :
                  </Text>
                }
                // value={form.values.numberOfFamilies.toString()}
                size='sm'
                w='100%'
                classNames={{
                  input: 'placeholder:!text-sm !text-primary !font-medium',
                }}
                disabled // Always disabled as it's read-only
                key={form.key('numberOfFamilies')}
                {...form.getInputProps('numberOfFamilies')}
              />
            )}
          </SimpleGrid>

          {(isDelegate || isManager) && isDisplayMode && (
            <Button
              mt={32}
              fz={20}
              fw={500}
              // w={150}
              c={'white'}
              className='!bg-primary !shadow-lg max-lg:!mt-10'
              onClick={() => setQuery(ACTION_ADD_EDIT_DISPLAY.EDIT)}
              rightSection={<UserPen size={18} />}
            >
              تعديل
            </Button>
          )}

          {(isEditMode || isAddMode) && (isDelegate || isManager) ? (
            <Button
              loading={isMutationLoading}
              mt={32}
              fz={20}
              fw={500}
              // w={150}
              c={'white'}
              className={`!shadow-lg max-lg:!mt-10 !bg-primary ${
                !form.isValid() ? '!bg-primary/70' : '!bg-primary'
              }`}
              onClick={() => handleSubmit()}
              rightSection={<Save size={18} />}
            >
              حفظ
            </Button>
          ) : null}
        </form>
      </Stack>
    </Stack>
  );
}
