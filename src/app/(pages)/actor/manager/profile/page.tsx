'use client';
import { man } from '@/assets/common';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  NativeSelect,
  NumberInput,
  // DateInput,
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
} from '@/validation/manager/profileSchema';
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

export default function Profile() {
  const { startUpload } = useUploadThing('mediaUploader');
  const [avatarImage, setAvatarImage] = useState<File | string | null>(man.src);
  const [uploading, setUploading] = useState(false);

  // Clean up URL.createObjectURL to prevent memory leaks
  useEffect(() => {
    if (avatarImage instanceof File) {
      const objectUrl = URL.createObjectURL(avatarImage);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatarImage]);

  // handel upload avatar image
  const uploadImages = async (file: File | null): Promise<string | null> => {
    if (!file) return null;
    try {
      const mediaUrl = await handleUploadMedia(file, startUpload);
      if (!mediaUrl) {
        throw new Error('Failed to upload image');
      }
      return mediaUrl;
    } catch (error) {
      notifications.show({
        title: 'Upload Error',
        message: 'Failed to upload image. Please try again.',
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
      return null;
    }
  };

  const form = useForm<managerProfileType>({
    mode: 'uncontrolled',
    initialValues: {
      // avatar: man.src,
      name: '',
      idNumber: 0,
      gender: 'male',
      maritalStatus: 'single',
      nationality: 'فلسطين',
      email: '',
      birthDate: new Date(Date.now()), // Changed to null for DateInput
      mobileNumber: '+970595796456',
      alternativeNumber: '',
    },
    validate: zodResolver(managerProfileSchema),
    validateInputOnChange: false, // Validate only on submit to reduce re-renders
  });

  const handleSubmit = async (values: managerProfileType) => {
    setUploading(true);

    try {
      console.log('Form submitted:', values);
      const avatarUrl =
        avatarImage instanceof File
          ? await uploadImages(avatarImage)
          : avatarImage;
      console.log('🚀 ~ handleSubmit ~ avatarUrl:', avatarUrl);
    } catch (error) {
      console.error('Submission failed:', error);
      form.setErrors({ general: 'فشل في حفظ الملف الشخصي' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack p={10}>
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
              src={man}
              alt='Avatar'
              className='w-[100px] h-[100px]'
              priority
            />
          )}
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
        </Box>
      </Box>

      {/* Personal Information */}
      <Stack mt={30}>
        <Text w='100%' ta='start' fz={24} fw={600} className='!text-primary'>
          بياناتي الشخصية:
        </Text>
        <form
          className='flex flex-col items-center w-full'
          onSubmit={form.onSubmit(handleSubmit)}
        >
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
              key={form.key('idNumber')}
              {...form.getInputProps('idNumber')}
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
              excludeDate={(date) => date > new Date()} // Exclude future dates
              key={form.key('birthDate')}
              {...form.getInputProps('birthDate')}
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
                  value={form.values.mobileNumber}
                  key={form.key('mobileNumber')}
                  {...form.getInputProps('mobileNumber')}
                />
              </Box>
            </Stack>
            <Stack w='100%' gap={0}>
              <Text
                fz={18}
                fw={500}
                w={'100%'}
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
                  value={form.values.alternativeNumber}
                  key={form.key('alternativeNumber')}
                  {...form.getInputProps('alternativeNumber')}
                />
              </Box>
            </Stack>
          </SimpleGrid>
          <Button
            loading={uploading}
            type='submit'
            mt={32}
            fz={20}
            fw={500}
            w={228}
            c={'white'}
            className={`!shadow-lg max-lg:!mt-10 !bg-primary ${
              !form.isValid() ? '!bg-primary/70' : '!bg-primary'
            }`}
            // disabled={!form.isValid()}
          >
            حفظ
          </Button>
        </form>
      </Stack>
    </Stack>
  );
}
