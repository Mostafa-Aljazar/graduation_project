import React from 'react';
import { LoadingOverlay } from '@mantine/core';
export default function loading() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
    </div>
  );
}
