'use client';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  NativeSelect,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  AUTH_ROUTES,
  DELEGATE_ROUTES_fUNC,
  DISPLACED_ROUTES_fUNC,
  MANAGER_ROUTES_fUNC,
  SECURITY_ROUTES_fUNC,
} from '@/constants/routes';
import Link from 'next/link';
import { loginSchema, loginType } from '@/validation/auth/loginSchema';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/actions/auth/login';
import { loginResponse } from '@/@types/auth/loginResponse.type';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { toFormData } from '@/utils/objectToFormData';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { LOCALSTORAGE_SESSION_KEY } from '@/constants/sessionKey';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  // Define the form schema
  const form = useForm<loginType>({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', userType: 'DISPLACED' },
    validate: zodResolver(loginSchema),
  });

  const loginMutation = useMutation<loginResponse, Error, FormData>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('🚀 ~ Login ~ data:', data);
      if (Number(data.status) == 200) {
        notifications.show({
          title: 'مرحبا بك',
          message: 'تم تسجيل الدخول بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
          loading: true,
        });

        // Save the login data to local storage
        localStorage.setItem(LOCALSTORAGE_SESSION_KEY, JSON.stringify(data));

        // TODO: change route to user profile
        if (data.user.role === 'DISPLACED') {
          router.push(DISPLACED_ROUTES_fUNC(data.user.id).PROFILE);
        } else if (data.user.role === 'MANAGER') {
          router.push(MANAGER_ROUTES_fUNC(data.user.id).PROFILE);
        } else if (data.user.role === 'DELEGATE') {
          router.push(DELEGATE_ROUTES_fUNC(data.user.id).PROFILE);
        } else if (data.user.role === 'SECURITY') {
          router.push(SECURITY_ROUTES_fUNC(data.user.id).PROFILE);
        }
        return;
      } else {
        form.reset();
        throw new Error(data.error || 'فشل في تسجيل الدخول');
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

  const handleSubmit = form.onSubmit((data: loginType) => {
    try {
      // console.log('🚀 ~ handleSubmit ~ data:', data);

      const formData = toFormData({
        ...data,
      });

      loginMutation.mutate(formData);
    } catch (error: any) {
      setError(error?.message as string);
    }
  });

  return (
    <>
      {/* Desktop & Mobile */}
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
          تسجيل الدخول
        </Text>

        <Stack justify='center' align='center' gap={20}>
          <form
            className='relative flex flex-col items-center gap-3'
            onSubmit={handleSubmit}
          >
            {/* Loading Overlay */}
            <LoadingOverlay
              visible={loginMutation.isPending}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 0.3 }}
            />

            {/*  userType */}
            <NativeSelect
              data={[
                { label: 'نازح', value: 'DISPLACED' },
                { label: 'مدير', value: 'MANAGER' },
                { label: 'مندوب', value: 'DELEGATE' },
                { label: 'أمن', value: 'SECURITY' },
                { label: 'مسؤول الأمن', value: 'SECURITY_OFFICER' },
              ]}
              label={
                <Text fw={400} c={'#817C74'} fz={16}>
                  تسجيل الدخول ك ؟
                </Text>
              }
              size='md'
              w={{ base: 343, md: 400 }}
              className='!border-second !border-w-1 focus:!border-none !outline-none'
              key={form.key('userType')}
              {...form.getInputProps('userType')}
              classNames={{
                input: '!text-dark !font-medium !text-sm',
                error:
                  '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
              }}
            />

            {/* Email Id */}
            <TextInput
              type='email'
              label={
                <Text fw={400} c={'#817C74'} fz={16}>
                  البريد الاكتروني
                </Text>
              }
              placeholder={'ادخل البريد الاكتروني'}
              size='md'
              w={{ base: 343, md: 400 }}
              className='!border-second !border-w-1 focus:!border-none !outline-none'
              key={form.key('email')}
              {...form.getInputProps('email')}
              classNames={{
                input: '!text-dark !font-medium !text-sm',
                error:
                  '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
              }}
            />

            {/*  password */}
            <PasswordInput
              type='password'
              label={
                <Text fw={400} c={'#817C74'} fz={16}>
                  كلمة المرور
                </Text>
              }
              placeholder={'ادخل كلمة المرور'}
              size='md'
              w={{ base: 343, md: 400 }}
              className='!border-second !border-w-1 focus:!border-none !outline-none'
              key={form.key('password')}
              {...form.getInputProps('password')}
              classNames={{
                input: '!text-dark !font-medium !text-sm',
                error:
                  '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
              }}
            />

            <Group wrap='nowrap' align='center' w={'100%'}>
              <Link
                href={AUTH_ROUTES.FORGET_PASSWORD}
                className='font-normal text-primary text-sm'
              >
                نسيت كلمة المرور ؟
              </Link>
            </Group>

            <Button
              loading={loginMutation.isPending}
              type='submit'
              mt={32}
              fz={20}
              fw={500}
              c={'white'}
              w={228}
              className={`!shadow-lg max-lg:!mt-10 ${
                !form.getValues().password || !form.getValues().email
                  ? '!bg-primary/70'
                  : '!bg-primary'
              }`}
              disabled={!form.getValues().password || !form.getValues().email}
            >
              دخول
            </Button>
            {error ? (
              <Text fw={'500'} mt={'sm'} size='sm' ta='center' c={'red'}>
                {error}
              </Text>
            ) : null}
          </form>
        </Stack>
      </Stack>
    </>
  );
}
