'use client';

import {
  Box,
  Stack,
  Text,
  SimpleGrid,
  LoadingOverlay,
  Paper,
  Flex,
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
    <Stack p={{ base: 12, md: 24 }} pos='relative'>
      <LoadingOverlay
        visible={isLoading}
        zIndex={50}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <Box w='100%' h={90} className='relative bg-primary rounded-2xl'>
        <Box
          pos='absolute'
          bottom='-50%'
          left='50%'
          className='bg-white shadow-lg border border-gray-200 rounded-full w-[90px] h-[90px] overflow-hidden -translate-x-1/2'
        >
          <Image
            src={MAN.src || user?.profileImage || MAN.src}
            alt='securityProfile'
            fill
            className='object-cover'
          />
        </Box>
      </Box>

      <Text mt={60} fz={{ base: 16, md: 20 }} fw={600} className='text-primary'>
        بيانات فرد الأمن
      </Text>

      <Paper
        p={{ base: 16, md: 24 }}
        shadow='md'
        radius='md'
        withBorder
        className='bg-gray-50 dark:bg-dark-700'
      >
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg'>
          <InfoItem label='الاسم' value={user?.name} />
          <InfoItem label='رقم الهوية' value={user?.nationalId} />
          <InfoItem
            label='الجنس'
            value={GENDER_LABELS[user?.gender || 'MALE']}
          />
          <InfoItem label='رقم الجوال' value={user?.mobileNumber} />
          <InfoItem label='رقم بديل' value={user?.alternativeMobileNumber} />
          <InfoItem label='الجنسية' value={user?.nationality} />
          <InfoItem label='العنوان' value={user?.originalAddress} />
          <InfoItem label='التعليم' value={user?.education} />
          <InfoItem
            label='الحالة الاجتماعية'
            value={MATERIAL_STATUS_LABELS[user?.socialStatus || 'SINGLE']}
          />
          <InfoItem
            label='الوظيفة'
            value={USER_TYPE_LABELS[user?.job || USER_TYPE.SECURITY]}
          />
          <InfoItem
            label='الدور'
            value={USER_TYPE_LABELS[user?.role || USER_TYPE.SECURITY]}
          />
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <Flex direction={{ base: 'row', lg: 'column' }} gap={4}>
      <Text fz={14} fw={600} className='text-gray-700 dark:text-gray-300'>
        {label}
      </Text>
      <Text fz={14} fw={500} className='text-gray-900 dark:text-white'>
        {value || '-'}
      </Text>
    </Flex>
  );
}
