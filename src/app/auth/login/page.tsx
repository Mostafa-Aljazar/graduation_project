'use client';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import {
  Button,
  Group,
  LoadingOverlay,
  PasswordInput,
  Select,
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
import { loginSchema, loginType } from '@/validation/auth/login-schema';
import { useMutation } from '@tanstack/react-query';
import { login, loginProps } from '@/actions/auth/login';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { LOCALSTORAGE_SESSION_KEY } from '@/constants/sessionKey';
import { USER_RANK_LABELS, USER_TYPE } from '@/constants/userTypes';
import { loginResponse } from '@/@types/auth/loginResponse.type';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  // Define the form schema
  const form = useForm<loginType>({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', userType: 'DISPLACED' },
    validate: zodResolver(loginSchema),
  });

  const loginMutation = useMutation<loginResponse, Error, loginProps>({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status == 200) {
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
        if (data.user.role === USER_TYPE.DISPLACED) {
          router.push(
            DISPLACED_ROUTES_fUNC({ displaced_Id: data.user.id }).PROFILE
          );
        } else if (data.user.role === USER_TYPE.MANAGER) {
          router.push(
            MANAGER_ROUTES_fUNC({ manager_Id: data.user.id }).PROFILE
          );
        } else if (data.user.role === USER_TYPE.DELEGATE) {
          router.push(
            DELEGATE_ROUTES_fUNC({ delegate_Id: data.user.id }).PROFILE
          );
        } else if (data.user.role === USER_TYPE.SECURITY) {
          router.push(
            SECURITY_ROUTES_fUNC({ security_Id: data.user.id }).PROFILE
          );
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

  const handleSubmit = form.onSubmit((values: loginType) => {
    setError(''); // Clear previous errors on submit
    loginMutation.mutate({
      email: values.email,
      password: values.password,
      userType: values.userType,
    });
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
      pos={'relative'}
      className='!rounded-xl'
    >
      <LoadingOverlay
        visible={loginMutation.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <Text fw={500} fz={{ base: 28, md: 32 }} ta={'center'}>
        تسجيل الدخول
      </Text>

      <form
        className='flex flex-col items-center gap-3'
        onSubmit={handleSubmit}
      >
        <Select
          label={
            <Text fw={400} c={'#817C74'} fz={16}>
              تسجيل الدخول كَ ؟
            </Text>
          }
          data={[
            {
              label: USER_RANK_LABELS[USER_TYPE.MANAGER],
              value: USER_TYPE.MANAGER,
            },
            {
              label: USER_RANK_LABELS[USER_TYPE.DELEGATE],
              value: USER_TYPE.DELEGATE,
            },
            {
              label: USER_RANK_LABELS[USER_TYPE.DISPLACED],
              value: USER_TYPE.DISPLACED,
            },
            {
              label: USER_RANK_LABELS[USER_TYPE.SECURITY],
              value: USER_TYPE.SECURITY,
            },
          ]}
          size='md'
          w={{ base: 343, md: 400 }}
          className='!border-second !border-w-1 focus:!border-none !outline-none'
          classNames={{
            input: ' placeholder:!text-sm !text-primary !font-normal',
            error: '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
          }}
          key={form.key('userType')}
          {...form.getInputProps('userType')}
        />

        <TextInput
          type='email'
          label={
            <Text fw={500} fz={16} mb={3}>
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
            input: '!text-dark placeholder:!text-sm !text-primary !font-normal',
            error: '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
          }}
        />

        <PasswordInput
          type='password'
          label={
            <Text fw={500} fz={16} mb={3}>
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
            input: '!text-dark placeholder:!text-sm !text-primary !font-normal',
            error: '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
          }}
        />

        <Group wrap='nowrap' align='center' w={'100%'}>
          <Link
            href={AUTH_ROUTES.FORGET_PASSWORD}
            className='font-medium text-primary text-sm'
          >
            نسيت كلمة المرور ؟
          </Link>
        </Group>

        <Button
          type='submit'
          size='sm'
          fz={18}
          fw={500}
          c={'white'}
          w={228}
          mt={32}
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
  );
}
