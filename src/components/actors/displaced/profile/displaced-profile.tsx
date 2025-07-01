'use client';
import {
  Card,
  Text,
  Group,
  Stack,
  Grid,
  Avatar,
  Checkbox,
  Divider,
  Box,
  Paper,
  SimpleGrid,
  Flex,
} from '@mantine/core';
import {
  ACCOMMODATION_TYPE,
  ACCOMMODATION_TYPE_LABELS,
  AGES,
  CASE_TYPE,
  CASE_TYPE_LABELS,
} from '@/content/actor/displaced/filter';
import { User } from 'lucide-react';
import {
  MATERIAL_STATUS_LABELS,
  MATERIAL_STATUS,
} from '@/content/actor/delegate/profile-form';
import Image from 'next/image';
import { MAN } from '@/assets/actor';
import { useQuery } from '@tanstack/react-query';
import { DisplacedProfileResponse } from '@/@types/actors/displaced/profile/displacedProfileResponse.type';
import { getDisplaceds } from '@/actions/actors/general/displaced/getDisplaceds';
import { getDisplacedProfile } from '@/actions/actors/displaced/profile/getDisplacedProfile';

interface DisplacedPersonProps {
  displaced_Id: number;
}

export function DisplacedPerson({ displaced_Id }: DisplacedPersonProps) {
  // Fetch initial profile data ONLY if not in 'add' mode
  const {
    data: profileData,
    isLoading,
    refetch,
  } = useQuery<DisplacedProfileResponse>({
    queryKey: ['displacedProfile', displaced_Id],
    queryFn: () => getDisplacedProfile({ displaced_ID: Number(displaced_Id) }),
  });
  console.log('🚀 ~ profileData:', profileData);

  return (
    <Stack p={{ base: 10, md: 20 }}>
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
            src={MAN.src || profileData?.user.profileImage}
            alt='Profile'
            fill
            // className='object-contain !'
          />
        </Box>
      </Box>
      <Stack>
        <SimpleGrid cols={{ base: 1, md: 3 }} mt={50} w={'100%'}>
          <Group gap={5}>
            <Text fz={16} fw={600}>
              الاسم:
            </Text>
            <Text fz={16} fw={500}>
              {profileData?.user.name}
            </Text>
          </Group>
          <Group gap={5}>
            <Text fz={16} fw={600}>
              رقم الهوية:
            </Text>
            <Text fz={16} fw={500}>
              {profileData?.user.nationalId}
            </Text>
          </Group>
          <Group gap={5}>
            <Text fz={16} fw={600}>
              الجنسية:
            </Text>
            <Text fz={16} fw={500}>
              {profileData?.user.nationality}
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
                  <Text fz={16} fw={600}>
                    الزوجة:
                  </Text>
                  <Text fz={16} fw={500}>
                    {wife.name}
                  </Text>
                </Group>
                <Group gap={5}>
                  <Text fz={16} fw={600}>
                    رقم الهوية:
                  </Text>
                  <Text fz={16} fw={500}>
                    {wife.nationalId}
                  </Text>
                </Group>
                <Group gap={5}>
                  <Text fz={16} fw={600}>
                    الجنسية:
                  </Text>
                  <Text fz={16} fw={500}>
                    {wife.nationality}
                  </Text>
                </Group>
              </SimpleGrid>
            );
          })}

        <Group gap={5}>
          <Text fz={16} fw={600}>
            عنوان السكن الأصلي:
          </Text>
          <Text fz={16} fw={500}>
            {profileData?.user.originalAddress}
          </Text>
        </Group>

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
              <Text fz={16} fw={600}>
                الحالة الاجتماعية
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.socialStatus.status &&
                  MATERIAL_STATUS_LABELS[
                    profileData?.user.socialStatus.status as MATERIAL_STATUS
                  ]}
              </Text>
            </Stack>
            <Stack
              gap={4}
              align='center'
              hidden={profileData?.user.wives.length == 0}
            >
              <Text fz={16} fw={600}>
                عدد الزوجات
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.socialStatus.numberOfWives}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                عدد الافراد
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.socialStatus.totalFamilyMembers}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                عدد الذكور
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.socialStatus.numberOfMales}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                عدد الإناث
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.socialStatus.numberOfFemales}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                أقل من 6 أشهر
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {
                  profileData?.user.socialStatus.ageGroups[
                    AGES.less_than_6_month
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                6 أشهر - 2 سنوات
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {
                  profileData?.user.socialStatus.ageGroups[
                    AGES.from_6_month_to_2_years
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                2-6 سنوات
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {
                  profileData?.user.socialStatus.ageGroups[
                    AGES.from_2_years_to_6_years
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                6-12 سنة
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {
                  profileData?.user.socialStatus.ageGroups[
                    AGES.from_6_years_to_12_years
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                12-18 سنة
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {
                  profileData?.user.socialStatus.ageGroups[
                    AGES.from_12_years_to_18_years
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                أكثر من 18
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.socialStatus.ageGroups[AGES.more_than_18]}
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
              <Text fz={16} fw={600}>
                رقم الخيمة
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.displacement.tentNumber}
              </Text>
            </Stack>
            <Stack
              gap={4}
              align='center'
              hidden={profileData?.user.wives.length == 0}
            >
              <Text fz={16} fw={600}>
                نوع الحالة
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {
                  CASE_TYPE_LABELS[
                    profileData?.user.displacement.CaseType as CASE_TYPE
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                نوع الايواء
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {
                  ACCOMMODATION_TYPE_LABELS[
                    profileData?.user.displacement
                      .tentType as ACCOMMODATION_TYPE
                  ]
                }
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                تاريخ النزوح
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.displacement.displacementDate}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                اسم المندوب
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.displacement.delegateName}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                رقم المندوب
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.displacement.delegatePhone}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                اسم مدير المخيم
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.displacement.campManager}
              </Text>
            </Stack>

            <Stack gap={4} align='center'>
              <Text fz={16} fw={600}>
                رقم المدير
              </Text>
              <Text fz={16} fw={500} className='text-primary'>
                {profileData?.user.displacement.campManagerPhone}
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
              <Text fz={16} fw={600} className='text-nowrap'>
                الزوجة :
              </Text>
              <Group w={'100%'} justify='space-evenly'>
                <Checkbox
                  label={
                    <Text fz={16} fw={500} className='text-primary'>
                      مرضعة
                    </Text>
                  }
                  defaultChecked={false}
                  checked={profileData?.user.wives.some(
                    (wife) => wife.isWetNurse
                  )}
                  readOnly
                />

                <Checkbox
                  label={
                    <Text fz={16} fw={500} className='text-primary'>
                      حامل
                    </Text>
                  }
                  defaultChecked={false}
                  checked={profileData?.user.wives.some(
                    (wife) => wife.isPregnant
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
              <Text fz={16} fw={600} className='text-nowrap' w={'30%'}>
                إصابات حرب:
              </Text>
              <Stack w='100%' gap={20}>
                {profileData?.user.warInjuries.map((warInjury, index) => (
                  <Flex
                    direction={'row'}
                    key={index}
                    wrap={{ base: 'wrap', md: 'nowrap' }}
                    w='100%'
                    justify='space-evenly'
                    gap={5}
                  >
                    <Group w='100%' wrap='nowrap'>
                      <Text fz={16} fw={600} className='text-nowrap'>
                        الاسم:
                      </Text>
                      <Text fz={16} fw={500} className='text-primary'>
                        {warInjury.name}
                      </Text>
                    </Group>

                    <Group w='100%' wrap='nowrap'>
                      <Text fz={16} fw={600} className='text-nowrap'>
                        الإصابة:
                      </Text>
                      <Text fz={16} fw={500} className='text-primary'>
                        {warInjury.injury}
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
              <Text fz={16} fw={600} className='text-nowrap' w={'30%'}>
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
                    <Text fz={16} fw={600} className='text-nowrap'>
                      الشهيد:
                    </Text>
                    <Text fz={16} fw={500} className='text-primary'>
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
              <Text fz={16} fw={600} className='text-nowrap' w={'30%'}>
                حالات مرضية:
              </Text>
              <Stack w='100%' gap={5}>
                {profileData?.user.medicalConditions.map(
                  (medicalCondition, index) => (
                    <Flex
                      direction={'row'}
                      key={index}
                      wrap={{ base: 'wrap', md: 'nowrap' }}
                      w='100%'
                      justify='space-evenly'
                      gap={5}
                    >
                      <Group w='100%' wrap='nowrap'>
                        <Text fz={16} fw={600} className='text-nowrap'>
                          الاسم:
                        </Text>
                        <Text fz={16} fw={500} className='text-primary'>
                          {medicalCondition.name}
                        </Text>
                      </Group>

                      <Group w='100%' wrap='nowrap'>
                        <Text fz={16} fw={600} className='text-nowrap'>
                          المرض:
                        </Text>
                        <Text fz={16} fw={500} className='text-primary'>
                          {medicalCondition.condition}
                        </Text>
                      </Group>
                    </Flex>
                  )
                )}
              </Stack>
            </Flex>
            <Divider h={2} w={'100%'} />

            <Group align='flex-start' w={'100%'}>
              <Text fz={16} fw={600} className='text-nowrap'>
                ملاحظات اخرى:
              </Text>

              <Text
                fz={16}
                fw={500}
                w={'100%'}
                bg={'white'}
                p={20}
                pt={10}
                className='rounded-lg text-primary'
              >
                {profileData?.user.additionalNotes}
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
