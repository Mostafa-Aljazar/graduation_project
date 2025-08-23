import Pages_Mantine_Layout from '@/components/common/pages-mantine-layout';
import { ReactNode } from 'react';

export default function Pages_Layout({ children }: { children: ReactNode }) {
  return <Pages_Mantine_Layout>{children}</Pages_Mantine_Layout>;
}
