import React from 'react';
import { LoadingOverlay, Stack } from '@mantine/core';

export default function loading() {
  return (
    <Stack justify='center' align='center' w={'100vh'} h={'100vh'}>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
    </Stack>
  );
}
