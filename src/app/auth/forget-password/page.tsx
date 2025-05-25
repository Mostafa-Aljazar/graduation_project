'use client';
import React, { useState } from 'react';
import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/constants/routes';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import {
  forgetPassword,
  forgetPasswordProps,
} from '@/actions/auth/forgetPassword';
import forgetPasswordResponse from '@/@types/auth/forgetPasswordResponse.type';
import {
  forgetPasswordSchema,
  forgetPasswordType,
} from '@/validation/auth/forgetPasswordSchema';

export default function Forget_Password() {
  const form = useForm<forgetPasswordType>({
    mode: 'uncontrolled',
    initialValues: { email: '' },
    validate: zodResolver(forgetPasswordSchema),
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const forgetPasswordMutation = useMutation<
    forgetPasswordResponse,
    Error,
    forgetPasswordProps
  >({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      if (Number(data.status) == 200) {
        notifications.show({
          title: data.message,
          message: 'قم بالتحقق من بريدك الإلكتروني',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
          loading: true,
        });

        router.push(
          `${AUTH_ROUTES.OTP}?email=${encodeURIComponent(
            form.getValues().email
          )}&date=${encodeURIComponent(
            Date.now()
          )}&callback=${encodeURIComponent(AUTH_ROUTES.CREATE_NEW_PASSWORD)}`
        );
        form.reset();
      } else {
        throw new Error(
          data.error || 'فشل في إرسال رمز التحقق إلى بريدك الإلكتروني'
        );
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || error?.message;
      setError(errorMessage);
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = form.onSubmit((values: forgetPasswordType) => {
    forgetPasswordMutation.mutate({ email: values.email });
  });

  return (
    <Stack
      align='center'
      gap={40}
      bg={'white'}
      pt={{ base: 0, lg: 64 }}
      pb={20}
      h={'100%'}
      w={{ base: '100%', lg: 550 }}
      className='!rounded-xl'
    >
      <Text fw={500} fz={{ base: 28, md: 36 }} ta={'center'}>
        نسيت كلمة المرور
      </Text>

      <Stack justify='center' align='center' gap={20} pos={'relative'}>
        <form
          className='!relative flex flex-col items-center gap-0'
          onSubmit={handleSubmit}
        >
          <LoadingOverlay
            visible={forgetPasswordMutation.isPending}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 0.3 }}
          />

          <TextInput
            type='email'
            label={
              <Text fw={400} c={'#817C74'} fz={16}>
                البريد الإلكتروني
              </Text>
            }
            placeholder={'ادخل البريد الإلكتروني'}
            w={{ base: 343, md: 400 }}
            className='!border-second !border-w-1 focus:!border-none !outline-none'
            key={form.key('email')}
            {...form.getInputProps('email')}
            classNames={{
              input: '!text-sm',
              error: '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
            }}
          />

          <Button
            type='submit'
            mt={32}
            fz={20}
            fw={500}
            c={'white'}
            w={228}
            className={`!shadow-lg max-lg:!mt-10 ${
              !form.getValues().email ? '!bg-primary/70' : '!bg-primary'
            }`}
            disabled={!form.getValues().email}
          >
            إرسال
          </Button>
          {error ? (
            <Text fw={'500'} mt={'sm'} size='sm' ta='center' c={'red'}>
              {error}
            </Text>
          ) : null}
        </form>
        <Group wrap='nowrap' align='center' w={'100%'}>
          <Divider h={1} bg={'#DFDEDC'} w={'100%'} flex={1} />
          <Text mx={8} fw={400} c={'#817C74'}>
            أو
          </Text>
          <Divider h={1} bg={'#DFDEDC'} w={'100%'} flex={1} />
        </Group>

        <Text fw={500} fz={16} className='!text-primary'>
          لديك حساب؟
          <Link href={AUTH_ROUTES.LOGIN} className='hover:!cursor-pointer'>
            تسجيل الدخول
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
}
