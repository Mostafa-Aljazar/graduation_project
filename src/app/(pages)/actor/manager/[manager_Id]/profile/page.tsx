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
  managerProfileType,
  managerProfileSchema,
} from '@/validation/actor/manager/profileSchema';
import '@mantine/core/styles.css';
import { Calendar, Camera } from 'lucide-react';
import { DatePickerInput } from '@mantine/dates';
import { Custom_Phone_Input } from '@/components/common/custom/Custom_Phone_Input';
import { useUploadThing } from '@/utils/uploadthing/uploadthing';
import { useEffect, useState } from 'react';
import { handleUploadMedia } from '@/utils/uploadthing/handleUploadMedia';
import { notifications } from '@mantine/notifications';
import Upload_Media from '@/components/actors/common/upload-files/Upload_Media';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateProfile } from '@/actions/actors/manager/profile/updateProfileInfo';
import { getProfile } from '@/actions/actors/manager/profile/getProfileInfo';
import { ProfileResponse } from '@/@types/actors/manager/profile/profileResponse.type';
import { toFormData } from '@/utils/objectToFormData';
import useAuth from '@/hooks/useAuth';
import { MAN } from '@/assets/actor';

export default function Profile() {
  const { startUpload } = useUploadThing('mediaUploader');
  const [avatarImage, setAvatarImage] = useState<File | string | null>(MAN.src);
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { isAuthenticated, isManager } = useAuth();
  // Form setup
  const form = useForm<managerProfileType>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      idNumber: 0,
      gender: 'male',
      maritalStatus: 'single',
      nationality: '',
      email: '',
      birthDate: new Date(),
      mobileNumber: '',
      alternativeNumber: '',
    },
    validate: zodResolver(managerProfileSchema),
    validateInputOnChange: true, // validate Inputs On Change
  });

  // Fetch initial profile data
  const { data: profileData, isLoading } = useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // Handle profile data and errors
  useEffect(() => {
    if (profileData && profileData.status === '200' && profileData.user) {
      setAvatarImage(profileData.user.avatar || MAN.src);
      form.setFieldValue('name', profileData.user.name);
      form.setFieldValue('idNumber', profileData.user.idNumber);
      form.setFieldValue('gender', profileData.user.gender);
      form.setFieldValue('maritalStatus', profileData.user.maritalStatus);
      form.setFieldValue('nationality', profileData.user.nationality);
      form.setFieldValue('email', profileData.user.email);
      form.setFieldValue('birthDate', profileData.user.birthDate || null);
      form.setFieldValue('mobileNumber', profileData.user.mobileNumber);
      form.setFieldValue(
        'alternativeNumber',
        profileData.user.alternativeNumber || ''
      );
    }
    // if return error, show not
    if (profileData && profileData.status !== '200') {
      const errorMessage =
        profileData?.error || 'فشل في تحميل بيانات الملف الشخصي';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    }
  }, [profileData]);

  // Clear errors when entering edit mode
  useEffect(() => {
    if (isEditMode) {
      form.clearErrors();
    }
  }, [isEditMode]);

  // Clean up URL.createObjectURL to prevent memory leaks
  useEffect(() => {
    if (avatarImage instanceof File) {
      const objectUrl = URL.createObjectURL(avatarImage);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatarImage]);

  // Mutation for updating profile
  const profileMutation = useMutation<ProfileResponse, Error, FormData>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setIsEditMode(false);

      if (Number(data.status) === 200) {
        notifications.show({
          title: 'تم التحديث',
          message: 'تم تحديث الملف الشخصي بنجاح',
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
          birthDate: new Date(data.user.birthDate),
          mobileNumber: data.user.mobileNumber,
          alternativeNumber: data.user.alternativeNumber || '',
        });
        setAvatarImage(data.user.avatar || MAN.src);
      } else {
        throw new Error(data.error || 'فشل في تحديث الملف الشخصي');
      }
    },
    onError: (error: any) => {
      setIsEditMode(false);

      const errorMessage = error?.message || 'حدث خطأ أثناء تحديث الملف الشخصي';
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

  // Handle image uploads
  const uploadImages = async (file: File | null): Promise<string | null> => {
    if (!file) return null;
    try {
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
    }
  };

  // Handle form submission
  const handleSubmit = form.onSubmit(async (values: managerProfileType) => {
    try {
      setUploading(true);
      // Handle avatar image upload
      const avatarUrl =
        avatarImage && avatarImage instanceof File
          ? await uploadImages(avatarImage)
          : avatarImage;

      const formData = toFormData({
        ...values,
        avatar: avatarUrl ?? '',
      });

      profileMutation.mutate(formData);
    } catch (error: any) {
      const errorMessage = error?.message || 'فشل في حفظ الملف الشخصي';
      form.setErrors({ general: errorMessage });
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    } finally {
      setUploading(false);
    }
  });

  return (
    <Stack p={10} pos={'relative'}>
      {/* Loading Overlay for initial fetch */}
      <LoadingOverlay
        visible={isLoading || profileMutation.isPending || uploading}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      {/* Image */}
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
          {isEditMode && (
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

      {/* Personal Information */}
      <Stack mt={30}>
        <Text w='100%' ta='start' fz={24} fw={600} className='!text-primary'>
          بياناتي الشخصية:
        </Text>
        <form className='flex flex-col items-center w-full'>
          <SimpleGrid
            cols={{ base: 1, md: 2, lg: 3 }}
            verticalSpacing='sm'
            w={'100%'}
          >
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
              disabled={!isEditMode}
            />
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
              disabled={!isEditMode}
            />
            <NativeSelect
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  الجنس :
                </Text>
              }
              data={[
                { label: 'ذكر', value: 'male' },
                { label: 'أنثى', value: 'female' },
              ]}
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('gender')}
              {...form.getInputProps('gender')}
              disabled={!isEditMode}
            />
            <NativeSelect
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  الحالة الاجتماعية :
                </Text>
              }
              data={[
                { label: 'أعزب / عزباء', value: 'single' },
                { label: 'متزوج / متزوجة', value: 'married' },
                { label: 'مطلق / مطلقة', value: 'divorced' },
                { label: 'أرمل / أرملة', value: 'widowed' },
              ]}
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              key={form.key('maritalStatus')}
              {...form.getInputProps('maritalStatus')}
              disabled={!isEditMode}
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
              disabled={!isEditMode}
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
              disabled={!isEditMode}
            />
            <DatePickerInput
              label={
                <Text fz={18} fw={500} className='!text-dark !text-nowrap'>
                  تاريخ الميلاد :
                </Text>
              }
              placeholder='ادخل تاريخ الميلاد...'
              size='sm'
              w='100%'
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-medium',
              }}
              leftSection={<Calendar size={16} className='text-[#B9B5B1]' />}
              valueFormat='DD/MM/YYYY'
              excludeDate={(date) => new Date(date) > new Date()}
              key={form.key('birthDate')}
              {...form.getInputProps('birthDate')}
              disabled={!isEditMode}
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
                  disabled={!isEditMode}
                />
              </Box>
            </Stack>
            {/* Alternative Number may not exist */}
            {isEditMode || profileData?.user.alternativeNumber ? (
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
                    disabled={!isEditMode}
                  />
                </Box>
              </Stack>
            ) : null}
          </SimpleGrid>
          {isManager ? (
            isEditMode ? (
              <Button
                loading={profileMutation.isPending}
                mt={32}
                fz={20}
                fw={500}
                w={228}
                c={'white'}
                className={`!shadow-lg max-lg:!mt-10 !bg-primary ${
                  !form.isValid() ? '!bg-primary/70' : '!bg-primary'
                }`}
                onClick={() => handleSubmit()}
              >
                حفظ
              </Button>
            ) : (
              <Button
                mt={32}
                fz={20}
                fw={500}
                w={228}
                c={'white'}
                className='!bg-primary !shadow-lg max-lg:!mt-10'
                onClick={() => setIsEditMode(true)}
              >
                تعديل
              </Button>
            )
          ) : null}
        </form>
      </Stack>
    </Stack>
  );
}
