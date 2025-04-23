'use client';
import { Container, Flex, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import photo from '@/assets/blogDetails/blogID.png';
import Blog_Card from '@/components/blog/Blog_Card';
import Blog_Article from '@/components/blog/Blog_Article';
import Image_Div from '@/components/common/Image_Div';
import Footer from '@/components/common/Footer';

const Page = () => {
  return (
    <>
      <Container fluid px='md' pt={40} className='w-full'>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap='xl'
          align='start'
          pt={40}
        >
          {/* المقال */}
          <Blog_Article /> {/* الجهة الجانبية */}
          <div className='flex flex-col items-center w-full md:w-[40%]'>
            <Image
              alt='Blog Image'
              src={photo}
              width={500}
              height={300}
              className='shadow-md w-full max-w-[500px] object-cover'
            />
            <Title
              order={4}
              c='#345E40'
              mt='lg'
              mb='sm'
              fw={600}
              className='w-full text-base sm:text-lg md:text-xl text-center'
            >
              مقالات أخرى
            </Title>
            {/* الكروت */}      
            <div className='flex flex-col items-center gap-4 w-full'>
                            <Blog_Card />
                            <Blog_Card />           
            </div>
                     
          </div>
                 
        </Flex>
             
      </Container>
      <Image_Div />
      <Footer />
    </>
  );
};

export default Page;
