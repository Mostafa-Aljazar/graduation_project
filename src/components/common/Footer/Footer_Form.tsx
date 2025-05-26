'use client';

import {
  Button,
  Textarea,
  TextInput,
  Group,
  Box,
  Text,
  Flex,
  LoadingOverlay,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import { notifications } from '@mantine/notifications';
import { contactUsSchema, contactUsType } from '@/validation/contactUsSchema';
import { useMutation } from '@tanstack/react-query';
import { sendEmailFun } from '@/actions/landing/contact-us';

export default function Footer_Form() {
  const form = useForm<contactUsType>({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      message: '',
    },
    validate: zodResolver(contactUsSchema),
  });

  const contactUSmutation = useMutation<unknown, unknown, contactUsType>({
    mutationFn: sendEmailFun,
    onSuccess: () => {
      notifications.show({
        title: 'تم الإرسال',
        message: 'تم إرسال رسالتك بنجاح!',
        color: 'green',
        position: 'top-right',
        withBorder: true,
      });
      form.reset();
    },
    onError: () => {
      notifications.show({
        title: 'خطأ',
        message: 'فشل إرسال الرسالة. حاول مرة أخرى.',
        color: 'red',
        position: 'top-right',
        withBorder: true,
      });
    },
  });

  const handleSubmit = form.onSubmit((values: contactUsType) => {
    contactUSmutation.mutate(values);
  });

  return (
    <Box
      p={{ base: 10, md: 24 }}
      w={{ base: '100%', lg: '80%' }}
      pos={'relative'}
      className='!shadow-gray-300 shadow-2xl !border-1 !border-gray-300 !rounded-md'
    >
      <LoadingOverlay
        visible={contactUSmutation.isPending}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      <form className='space-y-4' onSubmit={handleSubmit}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={16}>
          <TextInput
            label={
              <Text fw={500} fz={16} c='dark'>
                الاسم
              </Text>
            }
            placeholder='أدخل الاسم'
            w={'100%'}
            radius='sm'
            size='sm'
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
            classNames={{
              error: '!text-end !text-[#FD6265] !font-normal !text-sm',
            }}
          />
          <TextInput
            label={
              <Text fw={500} fz={16} c='dark'>
                اللقب
              </Text>
            }
            placeholder='أدخل اللقب'
            w={'100%'}
            radius='sm'
            size='sm'
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
            classNames={{
              error: '!text-end !text-[#FD6265] !font-normal !text-sm',
            }}
          />
        </Flex>
        <Flex direction={{ base: 'column', md: 'row' }} gap={16}>
          <TextInput
            label={
              <Text fw={500} fz={16} c='dark'>
                البريد الإلكتروني
              </Text>
            }
            type='email'
            placeholder='أدخل البريد الإلكتروني'
            w={'100%'}
            radius='sm'
            size='sm'
            key={form.key('email')}
            {...form.getInputProps('email')}
            classNames={{
              error: '!text-end !text-[#FD6265] !font-normal !text-sm',
            }}
          />
          <TextInput
            label={
              <Text fw={500} fz={16} c='dark'>
                العنوان
              </Text>
            }
            placeholder='أدخل العنوان'
            w={'100%'}
            radius='sm'
            size='sm'
            key={form.key('address')}
            {...form.getInputProps('address')}
            classNames={{
              error: '!text-end !text-[#FD6265] !font-normal !text-sm',
            }}
          />
        </Flex>
        <Textarea
          label={
            <Text fw={500} fz={16} c='dark'>
              الرسالة
            </Text>
          }
          placeholder='أدخل رسالتك'
          minRows={3}
          w={'100%'}
          radius='sm'
          size='sm'
          key={form.key('message')}
          {...form.getInputProps('message')}
          classNames={{
            error: '!text-end !text-[#FD6265] !font-normal !text-sm',
          }}
        />
        <Button
          type='submit'
          fullWidth
          size='sm'
          radius='sm'
          fz={16}
          fw={500}
          className='!bg-primary !text-white'
          loading={form.submitting}
        >
          إرسال
        </Button>
      </form>
    </Box>
  );
}
