'use client';

import {
  Box,
  Group,
  Stack,
  Text,
  SimpleGrid,
  LoadingOverlay,
  Paper,
  Divider,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getSecurityProfile } from '@/actions/actors/security/profile/getSecurityProfile';
import { ISecurityResponse } from '@/@types/actors/security/profile/securityProfileResponse.type';
import {
  GENDER_LABELS,
  MATERIAL_STATUS_LABELS,
} from '@/content/actor/delegate/profile-form';
import Image from 'next/image';
import { MAN } from '@/assets/actor';
import { USER_TYPE, USER_TYPE_LABELS } from '@/constants/userTypes';

interface SecurityPersonProps {
  security_Id: number;
}

export function Security_Person({ security_Id }: SecurityPersonProps) {
  const { data: profileData, isLoading } = useQuery<ISecurityResponse>({
    queryKey: ['securityProfile', security_Id],
    queryFn: () => getSecurityProfile({ security_Id }),
  });

  const user = profileData?.user;

  return (
    <Stack p={30} pos='relative'>
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
            src={MAN.src || profileData?.user.profileImage}
            alt='securityProfile'
            fill
          />
        </Box>
      </Box>

      <Stack mt={50}>
        <Text fz={18} fw={600} className='text-primary'>
          بيانات فرد الأمن :
        </Text>

        <Stack
          p={20}
          gap={20}
          pos='relative'
          className='shadow-lg border-1 border-gray-200 rounded-lg'
        >
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing='md'>
            <InfoItem label='الاسم' value={user?.name} />
            <InfoItem label='رقم الهوية' value={user?.nationalId} />
            <InfoItem
              label='الجنس'
              value={GENDER_LABELS[user?.gender || 'MALE']}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing='md'>
            <InfoItem label='رقم الجوال' value={user?.mobileNumber} />
            <InfoItem label='رقم بديل' value={user?.alternativeMobileNumber} />
            <InfoItem label='الجنسية' value={user?.nationality} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing='md'>
            <InfoItem label='العنوان' value={user?.originalAddress} />
            <InfoItem label='التعليم' value={user?.education} />
            <InfoItem
              label='الحالة الاجتماعية'
              value={MATERIAL_STATUS_LABELS[user?.socialStatus || 'SINGLE']}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing='md'>
            {/* <InfoItem label='الوظيفة' value={USER_TYPE_LABELS[user?.job]} />
            <InfoItem label='الدور' value={user?.role} /> */}

            <InfoItem
              label='الوظيفة'
              value={USER_TYPE_LABELS[user?.job || USER_TYPE.SECURITY]}
            />
            <InfoItem
              label='الدور'
              value={USER_TYPE_LABELS[user?.role || USER_TYPE.SECURITY]}
            />
          </SimpleGrid>
        </Stack>
      </Stack>
    </Stack>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <Stack gap={5}>
      <Text fw={600} fz={16} className='!text-primary'>
        {label}:
      </Text>
      <Text fw={500}>- {value || '-'}</Text>
    </Stack>
  );
}
