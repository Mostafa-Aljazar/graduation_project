import { Box } from '@mantine/core';
import { ReactNode } from 'react';

export default function Landing_Layout({ children }: { children: ReactNode }) {
  return <Box pt={60}>{children}</Box>;
}
