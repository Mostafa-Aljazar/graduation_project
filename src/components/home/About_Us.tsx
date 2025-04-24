import { logo } from '@/assets/common';
import { Flex, Group, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function About_Us() {
  return (
    <Stack pr={'8%'} py={{ base: 20, md: 40 }} gap={25}>
      <Text fw={600} fz={30} className='!text-primary'>
        من نحن ؟
      </Text>

      <Group gap={50} wrap='nowrap' align='start' px={0}>
        <Image
          src={logo}
          alt='logo'
          width={120}
          height={120}
          className='hidden md:block'
        />
        <Stack gap={20} pl={'13%'}>
          <Text fw={500} fz={20} c={'dark'}>
            مخيم الأقصى للإغاثة و التنمية هي مؤسسة مستقلة غير ربحية , تأسست في
            العام 2025م , لتنفيذ العديد من المشاريع الإغاثية و التنموية في قطاع
            غزة المحاصر .
          </Text>
          <Text fw={500} fz={18} className='!text-primary'>
            نسعى لتقديم المساعدات الإنسانية للنازحين المتضررين في قطاع غزة و
            تقديم يد العون لهم من خلال تخفيف العبء اليومي عليهم و تسهيل أوضاعهم
            الحياتية، و توفير مجموعة متنوعة من المساعدات الإنسانية
          </Text>
        </Stack>
      </Group>
    </Stack>
  );
}
