import { Stack } from '@mantine/core';
import React from 'react';

export default function page() {
  return (
    <Stack
      pt={60} // when you make a new page , you should add padding top 60px
      className='xs:bg-red-500 md:bg-second w-full h-screen text-third'
    >
      page
    </Stack>
  );
}
