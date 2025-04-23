import { Flex, Text, TextInput, Textarea, Button } from '@mantine/core';
import { Phone, Mail, MapPin } from 'lucide-react';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { socialLinks } from '@/content/blog';
import Link from 'next/link';

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className='bg-white py-11 w-full'>
        <div className='flex flex-col items-start gap-8'>
          <div className='flex flex-col flex-1 items-center p-5'>
            <div className='flex flex-col items-start w-full'>
              <Text mb='lg' c='#345E40' fw={700} size='xl'>
                تواصل معنا
              </Text>
              <Text size='md' mt='xs' c='#000' ta='start'>
                نحن هنا لخدمتك! إذا كنت بحاجة إلى مزيد من المعلومات عن مؤسستنا
                أو لديك أي استفسارات بشأن كيفية تقديم الدعم والمساعدة، لا تتردد
                في التواصل معنا.
              </Text>
            </div>
            <div className='bg-[#EDEEF7] p-10 rounded-md w-full'>
              <form>
                <div className='flex flex-col gap-4 mb-4'>
                  <TextInput
                    label='الاسم'
                    required
                    radius='md'
                    size='md'
                    styles={{ input: { backgroundColor: 'white' } }}
                    className='w-full'
                  />
                  <TextInput
                    label='رقم الجوال'
                    required
                    radius='md'
                    size='md'
                    styles={{ input: { backgroundColor: 'white' } }}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-4 mb-4'>
                  <TextInput
                    label='البريد الإلكتروني'
                    required
                    radius='md'
                    size='md'
                    styles={{ input: { backgroundColor: 'white' } }}
                    className='w-full'
                  />
                  <TextInput
                    label='العنوان'
                    required
                    radius='md'
                    size='md'
                    styles={{ input: { backgroundColor: 'white' } }}
                    className='w-full'
                  />
                </div>
                <Textarea
                  label='الرسالة'
                  minRows={4}
                  required
                  radius='md'
                  size='lg'
                  styles={{ input: { backgroundColor: 'white' } }}
                  className='mb-4'
                />
                <Button
                  fullWidth
                  radius='md'
                  size='md'
                  color='#345E40'
                  variant='filled'
                  type='submit'
                  className='hover:brightness-90 transition duration-300'
                >
                  إرسال
                </Button>
              </form>
            </div>
            <Text mt='md' fw={600} c='#345E40' ta='center'>
              تابعنا على وسائل التواصل الاجتماعي
            </Text>
            <div className='flex gap-3 mt-2'>
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex justify-center items-center p-2 border border-[#345E40] rounded-md w-10 h-10'
                >
                  <Icon
                    size={20}
                    color='#345E40'
                    className='hover:scale-110 transition-transform duration-300'
                  />
                </Link>
              ))}
            </div>
            <div className='mt-5 text-center'>
              <Flex
                direction='column'
                gap='xl'
                mt='lg'
                align='start'
                w='100%'
                px='lg'
              >
                <Flex align='start' gap='lg'>
                  <Phone size={18} color='#345E40' />
                  <Text size='sm'>972 59-579-6456</Text>
                </Flex>
                <Flex align='start' gap='lg'>
                  <Mail size={18} color='#345E40' />
                  <Text size='sm'>AlaqsaCamp@gmail.com</Text>
                </Flex>
                <Flex align='start' gap='lg'>
                  <MapPin size={18} color='#345E40' />
                  <Text size='md'>قطاع غزة - فلسطين</Text>
                </Flex>
              </Flex>
            </div>
            <Text size='sm' mt='xl' c='#345E40' ta='center'>
              حقوق النشر والتصميم محفوظة © 2025 مخيم الأقصى للإغاثة والتنمية -
              AL AQSA
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white p-11 w-full'>
      <div className='flex md:flex-row flex-col items-start gap-8'>
        <div className='flex flex-col flex-1 items-center p-5'>
          <div className='flex flex-col items-start w-full'>
            <Text mb='xl' c='#345E40' fw={700} size='xl'>
              تواصل معنا
            </Text>
            <Text size='lg' mt='xs' c='#000' ta='start'>
              نحن هنا لخدمتك! إذا كنت بحاجة إلى مزيد من المعلومات عن مؤسستنا أو
              لديك أي استفسارات بشأن كيفية تقديم الدعم والمساعدة، لا تتردد في
              التواصل معنا.
            </Text>
          </div>

          <Text mt='md' fw={600} c='#345E40' ta='center'>
            تابعنا على وسائل التواصل الاجتماعي
          </Text>
          <div className='flex gap-3 mt-2'>
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='flex justify-center items-center p-2 border border-[#345E40] rounded-md w-10 h-10 hover:text-white transition duration-300'
              >
                <Icon
                  size={20}
                  color='#345E40'
                  className='hover:scale-110 transition-transform duration-300'
                />
              </a>
            ))}
          </div>

          <div className='mt-5 text-center'>
            <Flex
              direction='column'
              gap='xl'
              mt='lg'
              align='start'
              w='100%'
              px='lg'
            >
              <Flex align='start' gap='lg'>
                <Phone size={18} color='#345E40' />
                <Text size='sm'>972 59-579-6456</Text>
              </Flex>

              <Flex align='start' gap='lg'>
                <Mail size={18} color='#345E40' />
                <Text size='sm'>AlaqsaCamp@gmail.com</Text>
              </Flex>

              <Flex align='start' gap='lg'>
                <MapPin size={18} color='#345E40' />
                <Text size='sm'>قطاع غزة - فلسطين</Text>
              </Flex>
            </Flex>
          </div>

          <Text size='lg' mt='xl' c='#345E40' ta='center'>
            حقوق النشر والتصميم محفوظة © 2025 مخيم الأقصى للإغاثة والتنمية - AL
            AQSA
          </Text>
        </div>

        <div className='flex-1 bg-[#EDEEF7] p-10 rounded-md w-full'>
          <form>
            <div className='flex sm:flex-row flex-col gap-6 mb-4'>
              <TextInput
                label='الاسم'
                required
                radius='md'
                size='md'
                styles={{ input: { backgroundColor: 'white' } }}
                className='w-full'
              />
              <TextInput
                label='رقم الجوال'
                required
                radius='md'
                size='md'
                styles={{ input: { backgroundColor: 'white' } }}
                className='w-full'
              />
            </div>
            <div className='flex sm:flex-row flex-col gap-4 mb-4'>
              <TextInput
                label='البريد الإلكتروني'
                required
                radius='md'
                size='md'
                styles={{ input: { backgroundColor: 'white' } }}
                className='w-full'
              />
              <TextInput
                label='العنوان'
                required
                radius='md'
                size='md'
                styles={{ input: { backgroundColor: 'white' } }}
                className='w-full'
              />
            </div>
            <Textarea
              label='الرسالة'
              minRows={4}
              required
              radius='md'
              size='md'
              styles={{ input: { backgroundColor: 'white' } }}
              className='mb-4'
            />
            <Button
              fullWidth
              radius='md'
              size='lg'
              color='#345E40'
              variant='filled'
              type='submit'
              className='hover:brightness-90 transition duration-300'
            >
              إرسال
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
