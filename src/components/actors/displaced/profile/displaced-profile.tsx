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
} from '@mantine/core';

import Image from 'next/image';
import { MAN } from '@/assets/actor';
import { useQuery } from '@tanstack/react-query';
import { DisplacedProfileResponse } from '@/@types/actors/displaced/profile/displacedProfileResponse.type';
import { getDisplacedProfile } from '@/actions/actors/displaced/profile/getDisplacedProfile';
import {
  ACCOMMODATION_TYPE_LABELS,
  AGES,
  FAMILY_STATUS_TYPE_LABELS,
  SOCIAL_STATUS,
  SOCIAL_STATUS_LABELS,
  FAMILY_STATUS_TYPE,
  ACCOMMODATION_TYPE,
} from '@/@types/actors/common-types/index.type';

interface DisplacedPersonProps {
  displaced_Id: number;
}

export default function Displaced_Person({
  displaced_Id,
}: DisplacedPersonProps) {
  const { data: profileData, isLoading } = useQuery<DisplacedProfileResponse>({
    queryKey: ['displacedProfile', displaced_Id],
    queryFn: () => getDisplacedProfile({ displaced_Id: Number(displaced_Id) }),
  });

  return (
    <Stack p={{ base: 10, md: 20 }} pos={'relative'}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={50}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      <Box
        pos={'relative'}
        w={'100%'}
        h={{ base: 60, md: 80 }}
        className='bg-primary rounded-2xl md:rounded-4xl'
      >
        <Box
          pos='absolute'
          bottom='-50%'
          left='50%'
          className='bg-white shadow-md border-1 border-gray-200 !rounded-full w-[85px] md:w-[100px] h-[85px] md:h-[100px] !overflow-hidden !-translate-x-1/2'
        >
          <Image
            src={MAN.src || profileData?.user.profile_image}
            alt='displacedProfile'
            fill
          />
        </Box>
      </Box>
      <Stack>
        <SimpleGrid cols={{ base: 1, md: 3 }} mt={50} w={'100%'}>
          <Group gap={5}>
            <Text fz={16} fw={600} className='!text-black'>
              الاسم :
            </Text>
            <Text fz={16} fw={500} className='!text-gray-700'>
              {profileData?.user.name}
            </Text>
          </Group>
          <Group gap={5}>
            <Text fz={16} fw={600} className='!text-black'>
              رقم الهوية:
            </Text>
            <Text fz={16} fw={500} className='!text-gray-700'>
              {profileData?.user.identity}
            </Text>
          </Group>
          <Group gap={5}>
            <Text fz={16} fw={600} className='!text-black'>
              الجنسية:
            </Text>
            <Text fz={16} fw={500} className='!text-gray-700'>
              {profileData?.user.nationality}
            </Text>
          </Group>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 3 }} w={'100%'}>
          <Group gap={5}>
            <Text fz={16} fw={600} className='!text-black'>
              عنوان السكن الأصلي:
            </Text>
            <Text fz={16} fw={500} className='!text-gray-700'>
              {profileData?.user.original_address}
            </Text>
          </Group>

          <Group gap={5}>
            <Text fz={16} fw={600} className='!text-black'>
              رقم الجوال:
            </Text>
            <Text fz={16} fw={500} className='!text-gray-700'>
              {profileData?.user.phone_number}
            </Text>
          </Group>

          <Group gap={5}>
            <Text fz={16} fw={600} className='!text-black'>
              رقم بديل:
            </Text>
            <Text fz={16} fw={500} className='!text-gray-700'>
              {profileData?.user.alternative_phone_number}
            </Text>
          </Group>
        </SimpleGrid>

        <Divider h={2} w={'100%'} />
        {profileData?.user.wives &&
          profileData?.user.wives.length > 0 &&
          profileData?.user.wives.map((wife, index) => {
            return (
              <SimpleGrid key={index} cols={{ base: 1, md: 3 }} w={'100%'}>
                <Group gap={5}>
                  <Text fz={16} fw={600} className='!text-black !text-nowrap'>
                    الزوجة:
                  </Text>
                  <Text fz={16} fw={500} className='!text-gray-700'>
                    {wife.name}
                  </Text>
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
      </Stack>
    </Stack>
  );
}
