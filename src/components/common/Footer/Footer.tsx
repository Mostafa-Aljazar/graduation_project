import React from 'react';
import { Box, Stack, Text, Divider, Flex } from '@mantine/core';
import {
  FOOTER_COPYRIGHT,
  FOOTER_DESC,
  FOOTER_TITLE,
} from '@/content/common/footer';
import Footer_ContactInfo from './Footer_ContactInfo';
import Footer_Form from './Footer_Form';

export default function Footer() {
  return (
    <Box
      component='footer'
      bg='#12100DEB'
      c='white'
      pos='relative'
      pt={20}
      pb={20}
      style={{ borderTop: '1px solid #e5e7eb' }}
      w='100%'
      px={{ base: 20, lg: '5%' }}
      ta='right'
      className='!bg-second-light'
      id='contact-us'
    >
      <Text fw={700} fz={24} mb={8} className='!text-primary'>
        {FOOTER_TITLE}
      </Text>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        wrap='nowrap'
        justify='space-between'
        w={'100%'}
        gap={{ base: 20, md: '5%' }}
      >
        <Stack justify='space-between' w={{ base: '100%', lg: '80%' }} h='100%'>
          <Text c='dark' fz={16} fw={500} mb={16}>
            {FOOTER_DESC}
          </Text>
          <Footer_ContactInfo className='!hidden md:!block' />
        </Stack>

        <Footer_Form />
      </Flex>

      <Footer_ContactInfo className='md:!hidden !block !px-3 !pt-7' />

      <Divider my={8} color='gray' mt={20} />
      <Text fz='sm' c={'gray'} ta={'right'}>
        {FOOTER_COPYRIGHT}
      </Text>
    </Box>
  );
}
