import { Box } from '@mantine/core';
import React from 'react';

export default function Landing_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box pt={60}>{children}</Box>;
}
