'use client';

import {
  Text,
  Group,
  Stack,
  Checkbox,
  Divider,
  Box,
  SimpleGrid,
  Flex,
  LoadingOverlay,
  ActionIcon,
  Button,
  TextInput,
} from '@mantine/core';

import Image from 'next/image';
import { MAN } from '@/assets/actor';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DisplacedProfileResponse } from '@/@types/actors/displaced/profile/displacedProfileResponse.type';
import { getDisplacedProfile } from '@/actions/actors/displaced/profile/getDisplacedProfile';
import {
  ACCOMMODATION_TYPE_LABELS,
  AGES,
  FAMILY_STATUS_TYPE_LABELS,
  SOCIAL_STATUS,
  SOCIAL_STATUS_LABELS,
  ACCOMMODATION_TYPE,
  ACTION_ADD_EDIT_DISPLAY,
  GENDER,
  FAMILY_STATUS_TYPE,
} from '@/@types/actors/common-types/index.type';
import { useUploadThing } from '@/utils/uploadthing/uploadthing';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { useForm, zodResolver } from '@mantine/form';
import {
  displacedProfileSchema,
  DisplacedProfileSchemaType,
} from '@/validation/actor/displaceds/profile/displaced-profile-schema';
import { handleUploadMedia } from '@/utils/uploadthing/handleUploadMedia';
import { notifications } from '@mantine/notifications';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { delegateProfileType } from '@/validation/actor/delegate/delegate-profile-schema';
import {
  addNewDisplaced,
  AddNewDisplacedProps,
} from '@/actions/actors/displaced/profile/addNewDisplaced';
import {
  updateDisplacedProfile,
  UpdateDisplacedProfileProps,
} from '@/actions/actors/displaced/profile/updateDisplacedProfile';
import Upload_Media from '../../common/upload-files/Upload_Media';
import { Camera, UserPen } from 'lucide-react';
import { Custom_Phone_Input } from '@/components/common/custom/Custom_Phone_Input';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface DisplacedProfileFormProps {
  displaced_Id?: number;
}

export default function Displaced_Profile_Form({
  displaced_Id,
}: DisplacedProfileFormProps) {
  const { startUpload } = useUploadThing('mediaUploader');
  const [profileImage, setProfileImage] = useState<File | string | null>(
    MAN.src
  );
  const [uploading, setUploading] = useState(false);

  const { isAuthenticated, isDisplaced, isDelegate, isManager, user } =
    useAuth();
  const isOwner = isDisplaced && user?.id === displaced_Id;

  const router = useRouter();

  const [query, setQuery] = useQueryState(
    'action',
    parseAsStringEnum<ACTION_ADD_EDIT_DISPLAY>(
      Object.values(ACTION_ADD_EDIT_DISPLAY)
    ).withDefault(ACTION_ADD_EDIT_DISPLAY.DISPLAY)
  );

  const isAddMode = isManager && query === ACTION_ADD_EDIT_DISPLAY.ADD;
  const isEditMode =
    (isManager || isOwner) && query === ACTION_ADD_EDIT_DISPLAY.EDIT;
  const isDisplayMode = query === ACTION_ADD_EDIT_DISPLAY.DISPLAY;

  const form = useForm<DisplacedProfileSchemaType>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      identity: '',
      gender: GENDER.MALE,
      nationality: '',
      original_address: '',
      phone_number: '',
      alternative_phone_number: '',

      wives: [],

      social_status: {
        status: SOCIAL_STATUS.SINGLE,
        number_of_wives: 0,
        number_of_males: 0,
        number_of_females: 0,
        total_family_members: 1,
        age_groups: {
          [AGES.LESS_THAN_6_MONTHS]: 0,
          [AGES.FROM_6_MONTHS_TO_2_YEARS]: 0,
          [AGES.FROM_2_YEARS_To_6_YEARS]: 0,
          [AGES.FROM_6_YEARS_To_12_YEARS]: 0,
          [AGES.FROM_12_YEARS_To_18_YEARS]: 0,
          [AGES.MORE_THAN_18]: 0,
        },
      },

      displacement: {
        tent_number: '',
        tent_type: ACCOMMODATION_TYPE.INDOOR_TENT,
        family_status_type: FAMILY_STATUS_TYPE.NORMAL,
        displacement_date: '',
        delegate_name: '',
        delegate_phone: '',
        camp_manager: '',
        camp_managerPhone: '',
      },

      war_injuries: [],
      martyrs: [],
      medical_conditions: [],
      additional_notes: '',
    },
    validate: zodResolver(displacedProfileSchema),
    validateInputOnChange: true,
  });

  const {
    data: displacedProfileData,
    isLoading: isLoadingFetch,
    refetch,
  } = useQuery<DisplacedProfileResponse>({
    queryKey: ['delegateProfile', displaced_Id],
    queryFn: () =>
      getDisplacedProfile({ displaced_Id: displaced_Id as number }),
    enabled: isDisplayMode || isEditMode || !!displaced_Id,
  });

  useEffect(() => {
    if (!isAddMode && displacedProfileData) {
      if (displacedProfileData.status === 200 && displacedProfileData.user) {
        const user = displacedProfileData.user;

        setProfileImage(MAN.src || user.profile_image || MAN.src);

        form.setValues({
          name: user.name,
          email: user.email || '',
          identity: user.identity,
          gender: user.gender,
          nationality: user.nationality,
          original_address: user.original_address,
          phone_number:
            user.phone_number.length === 10
              ? `+97${user.phone_number}`
              : user.phone_number,
          alternative_phone_number:
            user.alternative_phone_number?.length === 10
              ? `+97${user.alternative_phone_number}`
              : user.alternative_phone_number || '',

          wives: user.wives || [],

          social_status: user.social_status || {
            status: SOCIAL_STATUS.SINGLE,
            number_of_wives: 0,
            number_of_males: 0,
            number_of_females: 0,
            total_family_members: 1,
            age_groups: {
              [AGES.LESS_THAN_6_MONTHS]: 0,
              [AGES.FROM_6_MONTHS_TO_2_YEARS]: 0,
              [AGES.FROM_2_YEARS_To_6_YEARS]: 0,
              [AGES.FROM_6_YEARS_To_12_YEARS]: 0,
              [AGES.FROM_12_YEARS_To_18_YEARS]: 0,
              [AGES.MORE_THAN_18]: 0,
            },
          },

          displacement: user.displacement || {
            tent_number: '',
            tent_type: ACCOMMODATION_TYPE.INDOOR_TENT,
            family_status_type: FAMILY_STATUS_TYPE.NORMAL,
            displacement_date: '',
            delegate_name: '',
            delegate_phone: '',
            camp_manager: '',
            camp_managerPhone: '',
          },

          war_injuries: user.war_injuries || [],
          martyrs: user.martyrs || [],
          medical_conditions: user.medical_conditions || [],
          additional_notes: user.additional_notes || '',
        });
      } else {
        notifications.show({
          title: 'خطأ',
          message:
            displacedProfileData.error ||
            'فشل في تحميل بيانات الملف الشخصي للنازح',
          color: 'red',
          position: 'top-left',
          withBorder: true,
        });
      }
    }

    if (isAddMode) {
      form.reset();
      setProfileImage(MAN.src);
    }
  }, [displacedProfileData, isAddMode]);

  useEffect(() => {
    if (profileImage instanceof File) {
      const objectUrl = URL.createObjectURL(profileImage);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImage]);

  const updateProfileMutation = useMutation<
    DisplacedProfileResponse,
    Error,
    UpdateDisplacedProfileProps
  >({
    mutationFn: updateDisplacedProfile,
    onSuccess: (data) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY);

      if (data.status === 200) {
        notifications.show({
          title: 'تم التحديث',
          message: 'تم تحديث الملف الشخصي للنازح بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });

        const user = data.user;

        form.setValues({
          name: user.name,
          email: user.email,
          identity: user.identity,
          gender: user.gender,
          nationality: user.nationality,
          original_address: user.original_address,
          phone_number:
            user.phone_number.length === 10
              ? `+97${user.phone_number}`
              : user.phone_number,
          alternative_phone_number:
            user.alternative_phone_number?.length === 10
              ? `+97${user.alternative_phone_number}`
              : user.alternative_phone_number || '',

          wives: user.wives || [],

          social_status: user.social_status,

          displacement: user.displacement,

          war_injuries: user.war_injuries || [],
          martyrs: user.martyrs || [],
          medical_conditions: user.medical_conditions || [],
          additional_notes: user.additional_notes || '',
        });

        setProfileImage(user.profile_image || MAN.src);
        refetch();
      } else {
        throw new Error(data.error || 'فشل في تحديث الملف الشخصي للنازح');
      }
    },
    onError: (error) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY);

      const errorMessage =
        error?.message || 'حدث خطأ أثناء تحديث الملف الشخصي للنازح';

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

  const addDisplacedProfileMutation = useMutation<
    DisplacedProfileResponse,
    Error,
    AddNewDisplacedProps
  >({
    mutationFn: addNewDisplaced,
    onSuccess: (data) => {
      if (data.status === 201) {
        notifications.show({
          title: 'تم الإضافة',
          message: 'تمت إضافة نازح جديد بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });

        router.push(GENERAL_ACTOR_ROUTES.DISPLACEDS);
      } else {
        throw new Error(data.error || 'فشل في إضافة النازح الجديد');
      }
    },
    onError: (error) => {
      setQuery(ACTION_ADD_EDIT_DISPLAY.DISPLAY);

      const errorMessage =
        error?.message || 'حدث خطأ أثناء إضافة النازح الجديد';

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
      if (!mediaUrl)
        throw new Error('فشل في رفع الصورة. يرجى المحاولة مرة أخرى.');
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

  const handleSubmit = form.onSubmit(
    async (values: DisplacedProfileSchemaType) => {
      console.log('🚀 ~ handleSubmit ~ values:', values);

      const avatarUrl =
        profileImage instanceof File
          ? await uploadImages(profileImage)
          : (profileImage as string | null) ?? null;

      const payload: DisplacedProfileSchemaType = {
        ...values,
        profile_image: avatarUrl,
      };

      const handleError = (error: unknown) => {
        const errorMessage =
          (error as Error)?.message || 'فشل في حفظ الملف الشخصي للنازح';

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
          addDisplacedProfileMutation.mutate(
            { payload },
            { onError: handleError }
          );
        }

        if (isEditMode) {
          updateProfileMutation.mutate(
            {
              displaced_Id: displaced_Id as number,
              payload,
            },
            { onError: handleError }
          );
        }
      } catch (error) {
        handleError(error);
      }
    }
  );

  const isMutationLoading =
    updateProfileMutation.isPending || addDisplacedProfileMutation.isPending;

  return (
    <Stack p={{ base: 10, md: 20 }} pos={'relative'}>
      <LoadingOverlay
        // visible={isLoadingFetch || isMutationLoading || uploading}
        visible={false}
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
            <Image
              src={MAN}
              alt='Avatar'
              className='w-[100px] h-[100px]'
              priority
            />
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
        <Group wrap='nowrap' align='center'>
          <Text ta='start' fz={20} fw={600} className='!text-primary'>
            {isAddMode ? 'إضافة نازح جديد:' : 'البيانات الشخصية:'}
          </Text>

          {(isManager || isDelegate) && isDisplayMode && (
            <Button
              variant='filled'
              size='xs'
              color='primary'
              type='submit'
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

        <SimpleGrid cols={{ base: 1, md: 3 }} mt={50} w={'100%'}>
          <Group gap={5} wrap='nowrap'>
            <TextInput
              label={
                <Text
                  fz={16}
                  fw={600}
                  mb={4}
                  className='!text-black !text-nowrap'
                >
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
          </Group>

          <Group gap={5} wrap='nowrap'>
            <TextInput
              label={
                <Text
                  fz={16}
                  fw={600}
                  mb={4}
                  className='!text-black !text-nowrap'
                >
                  رقم الهوية :
                </Text>
              }
              type='number'
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
          </Group>

          <Group gap={5} wrap='nowrap'>
            <TextInput
              label={
                <Text
                  fz={16}
                  fw={600}
                  mb={4}
                  className='!text-black !text-nowrap'
                >
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
          </Group>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 3 }} w={'100%'}>
          <Group gap={5}>
            <TextInput
              label={
                <Text
                  fz={16}
                  fw={600}
                  mb={4}
                  className='!text-black !text-nowrap'
                >
                  عنوان السكن الأصلي :
                </Text>
              }
              placeholder='ادخل عنوان السكن الأصلي...'
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              {...form.getInputProps('original_address')}
              disabled={isDisplayMode}
            />
          </Group>

          <Stack w='100%' gap={0}>
            <Text fz={16} fw={500} mb={4} className='!text-dark !text-nowrap'>
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
            (displacedProfileData?.user.alternative_phone_number &&
              displacedProfileData.user.alternative_phone_number !== '')) && (
            <Stack w='100%' gap={0}>
              <Text fz={16} fw={500} mb={4} className='!text-dark !text-nowrap'>
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
                  {...form.getInputProps('alternative_phone_number')}
                  disabled={isDisplayMode}
                />
              </Box>
            </Stack>
          )}
        </SimpleGrid>

        <Divider h={2} w={'100%'} />
        {isDisplayMode &&
          displacedProfileData?.user.wives &&
          displacedProfileData?.user.wives.length > 0 &&
          displacedProfileData?.user.wives.map((wife, index) => {
            return (
              <SimpleGrid key={index} cols={{ base: 1, md: 3 }} w={'100%'}>
                <Group gap={5}>
                  <TextInput
                    label={
                      <Text
                        fz={16}
                        fw={600}
                        mb={4}
                        className='!text-black !text-nowrap'
                      >
                        الزوجة :
                      </Text>
                    }
                    placeholder='ادخل الزوجة...'
                    size='sm'
                    w='100%'
                    classNames={{
                      input:
                        'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
                    }}
                    {...form.getInputProps('wives[]')}
                    disabled={isDisplayMode}
                  />
                  {/* <Text fz={16} fw={600} className='!text-black !text-nowrap'>
                    الزوجة:
                  </Text>
                  <Text fz={16} fw={500} className='!text-gray-700'>
                    {wife.name}
                  </Text> */}
                </Group>
                <Group gap={5}>
                  <Text fz={16} fw={600} className='!text-black'>
                    رقم الهوية:
                  </Text>
                  <Text fz={16} fw={500} className='!text-gray-700'>
                    {wife.identity}
                  </Text>
                </Group>
                <Group gap={5}>
                  <Text fz={16} fw={600} className='!text-black'>
                    الجنسية:
                  </Text>
                  <Text fz={16} fw={500} className='!text-gray-700'>
                    {wife.nationality}
                  </Text>
                </Group>
              </SimpleGrid>
            );
          })}

        <Divider h={2} w={'100%'} />
        {/* 
        <Stack>
          <Text fz={18} fw={600} mt={20} className='!text-primary'>
            بيانات الحالة الاجتماعية :
          </Text>
          <SimpleGrid
            cols={{ base: 2, md: 4 }}
            w={'100%'}
            className='bg-gray-200 shadow-md rounded-xl'
            p={20}
          >
            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                الحالة الاجتماعية
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.socialStatus.status &&
                  SOCIAL_STATUS_LABELS[
                    profileData?.user.socialStatus.status as SOCIAL_STATUS
                  ]}
              </Text>
            </Stack>
            <Stack
              gap={4}
              align='center'
              hidden={profileData?.user.wives.length == 0}
            >
              <Text fz={16} fw={600} className='!text-black'>
                عدد الزوجات
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.socialStatus.number_of_wives}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                عدد الافراد
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.socialStatus.total_family_members}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                عدد الذكور
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.socialStatus.number_of_males}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                عدد الإناث
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.socialStatus.number_of_females}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                أقل من 6 أشهر
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {
                  profileData?.user.socialStatus.age_groups[
                    AGES.LESS_THAN_6_MONTHS
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                6 أشهر - 2 سنوات
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {
                  profileData?.user.socialStatus.age_groups[
                    AGES.FROM_6_MONTHS_TO_2_YEARS
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                2-6 سنوات
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {
                  profileData?.user.socialStatus.age_groups[
                    AGES.FROM_2_YEARS_To_6_YEARS
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                6-12 سنة
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {
                  profileData?.user.socialStatus.age_groups[
                    AGES.FROM_6_YEARS_To_12_YEARS
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                12-18 سنة
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {
                  profileData?.user.socialStatus.age_groups[
                    AGES.FROM_12_YEARS_To_18_YEARS
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                أكثر من 18
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.socialStatus.age_groups[AGES.MORE_THAN_18]}
              </Text>
            </Stack>
          </SimpleGrid>
        </Stack>

        <Stack>
          <Text fz={18} fw={600} mt={20} className='!text-primary'>
            بيانات النزوح :
          </Text>
          <SimpleGrid
            cols={{ base: 2, md: 4 }}
            w={'100%'}
            className='bg-gray-200 shadow-md rounded-xl'
            p={20}
          >
            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                رقم الخيمة
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.displacement.tent_number}
              </Text>
            </Stack>
            <Stack
              gap={4}
              align='center'
              hidden={profileData?.user.wives.length == 0}
            >
              <Text fz={16} fw={600} className='!text-black'>
                نوع الحالة
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {
                  FAMILY_STATUS_TYPE_LABELS[
                    profileData?.user.displacement
                      .family_status_type as keyof typeof FAMILY_STATUS_TYPE_LABELS
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                نوع الايواء
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {
                  ACCOMMODATION_TYPE_LABELS[
                    profileData?.user.displacement
                      .tent_type as ACCOMMODATION_TYPE
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                تاريخ النزوح
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.displacement.displacement_date}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                اسم المندوب
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.displacement.delegate_name}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                رقم المندوب
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.displacement.delegate_phone}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                اسم مدير المخيم
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.displacement.camp_manager}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600} className='!text-black'>
                رقم المدير
              </Text>
              <Text fz={16} fw={500} className='!text-gray-700'>
                {profileData?.user.displacement.camp_managerPhone}
              </Text>
            </Stack>
          </SimpleGrid>
        </Stack>

        <Stack>
          <Text fz={18} fw={600} mt={20} className='!text-primary'>
            ملاحظات :
          </Text>
          <Stack w={'100%'} className='bg-gray-200 shadow-md rounded-xl' p={20}>
            <Group gap={4} align='center' wrap='nowrap'>
              <Text fz={16} fw={600} className='!text-black text-nowrap'>
                الزوجة :
              </Text>
              <Group w={'100%'} justify='space-evenly'>
                <Checkbox
                  label={
                    <Text fz={16} fw={500} className='!text-gray-700'>
                      مرضعة
                    </Text>
                  }
                  checked={Boolean(
                    profileData?.user.wives.some((w) => w.is_wet_nurse)
                  )}
                  readOnly
                />

                <Checkbox
                  label={
                    <Text fz={16} fw={500} className='!text-gray-700'>
                      حامل
                    </Text>
                  }
                  checked={Boolean(
                    profileData?.user.wives.some((w) => w.is_pregnant)
                  )}
                  readOnly
                />
              </Group>
            </Group>

            <Divider h={2} w={'100%'} />
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align='flex-start'
              w={'100%'}
            >
              <Text
                fz={16}
                fw={600}
                className='!text-black !text-nowrap'
                w={'30%'}
              >
                إصابات حرب:
              </Text>
              <Stack w='100%' gap={20}>
                {profileData?.user.war_injuries.map((item, index) => (
                  <Flex
                    direction={'row'}
                    key={index}
                    wrap={{ base: 'wrap', md: 'nowrap' }}
                    w='100%'
                    justify='space-evenly'
                    gap={5}
                  >
                    <Group w='100%' wrap='nowrap'>
                      <Text
                        fz={16}
                        fw={600}
                        className='!text-black !text-nowrap'
                      >
                        الاسم:
                      </Text>
                      <Text fz={16} fw={500} className='!text-gray-700'>
                        {item.name}
                      </Text>
                    </Group>

                    <Group w='100%' wrap='nowrap'>
                      <Text
                        fz={16}
                        fw={600}
                        className='!text-black !text-nowrap'
                      >
                        الإصابة:
                      </Text>
                      <Text fz={16} fw={500} className='!text-gray-700'>
                        {item.injury}
                      </Text>
                    </Group>
                  </Flex>
                ))}
              </Stack>
            </Flex>
            <Divider h={2} w={'100%'} />

            <Flex
              direction={{ base: 'column', md: 'row' }}
              align='flex-start'
              w={'100%'}
            >
              <Text fz={16} fw={600} className='!text-nowrap' w={'30%'}>
                شهداء:
              </Text>
              <Stack w='100%' gap={20}>
                {profileData?.user.martyrs.map((martyr, index) => (
                  <Flex
                    direction={'row'}
                    key={index}
                    wrap={{ base: 'wrap', md: 'nowrap' }}
                    w='100%'
                    gap={5}
                  >
                    <Text fz={16} fw={600} className='!text-black !text-nowrap'>
                      الشهيد:
                    </Text>
                    <Text fz={16} fw={500} className='!text-gray-700'>
                      {martyr.name}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Flex>
            <Divider h={2} w={'100%'} />

            <Flex
              direction={{ base: 'column', md: 'row' }}
              align='flex-start'
              w={'100%'}
            >
              <Text
                fz={16}
                fw={600}
                className='!text-black !text-nowrap'
                w={'30%'}
              >
                حالات مرضية:
              </Text>
              <Stack w='100%' gap={5}>
                {profileData?.user.medical_conditions.map((item, index) => (
                  <Flex
                    direction={'row'}
                    key={index}
                    wrap={{ base: 'wrap', md: 'nowrap' }}
                    w='100%'
                    justify='space-evenly'
                    gap={5}
                  >
                    <Group w='100%' wrap='nowrap'>
                      <Text
                        fz={16}
                        fw={600}
                        className='!text-black !text-nowrap'
                      >
                        الاسم:
                      </Text>
                      <Text fz={16} fw={500} className='!text-gray-700'>
                        {item.name}
                      </Text>
                    </Group>

                    <Group w='100%' wrap='nowrap'>
                      <Text
                        fz={16}
                        fw={600}
                        className='!text-black !text-nowrap'
                      >
                        المرض:
                      </Text>
                      <Text fz={16} fw={500} className='!text-gray-700'>
                        {item.condition}
                      </Text>
                    </Group>
                  </Flex>
                ))}
              </Stack>
            </Flex>
            <Divider h={2} w={'100%'} />

            <Group align='flex-start' w={'100%'}>
              <Text fz={16} fw={600} className='!text-black !text-nowrap'>
                ملاحظات اخرى:
              </Text>

              <Text
                fz={16}
                fw={500}
                w={'100%'}
                bg={'white'}
                p={20}
                pt={10}
                className='rounded-lg !text-gray-700'
              >
                {profileData?.user.additional_notes}
              </Text>
            </Group>
          </Stack>
        </Stack>
         */}
      </Stack>
    </Stack>
  );
}
