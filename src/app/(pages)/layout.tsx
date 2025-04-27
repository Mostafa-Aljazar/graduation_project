import Mantine_Layout from '@/components/common/Mantine_Layout';
import React from 'react';

export default function Pages_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Mantine_Layout>{children}</Mantine_Layout>;
}
