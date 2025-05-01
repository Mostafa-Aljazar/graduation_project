'use client';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  AUTH_ROUTES,
  DELEGATE_ROUTES,
  DISPLACED_ROUTES,
  LANDING_ROUTES,
  MANAGER_ROUTES,
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
  const [userType, setUserType] = useState<UserType>(USER_TYPE.DISPLACED);
  const [error, setError] = useState('');
  const router = useRouter();

  // Define the form schema
  const form = useForm<loginType>({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: zodResolver(loginSchema),
  });

  const loginMutation = useMutation<loginResponse, Error, FormData>({
    mutationFn: login,
    onSuccess: (data) => {
      // console.log('🚀 ~ Login ~ data:', data);
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
          router.push(DISPLACED_ROUTES.PROFILE);
        } else if (data.user.role === 'MANAGER') {
          router.push(MANAGER_ROUTES.PROFILE);
        }
        if (data.user.role === 'DELEGATE') {
          router.push(DELEGATE_ROUTES.PROFILE);
        } else {
          router.push(LANDING_ROUTES.HOME);
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
      const formData = toFormData({
        ...data,
        userType,
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
            className='relative flex flex-col items-center gap-0'
            onSubmit={handleSubmit}
          >
            {/* Loading Overlay */}
            <LoadingOverlay
              visible={loginMutation.isPending}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 0.3 }}
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
              w={{ base: 343, md: 400 }}
              className='!border-second !border-w-1 focus:!border-none !outline-none'
              key={form.key('email')}
              {...form.getInputProps('email')}
              classNames={{
                input: '!text-sm',

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
              w={{ base: 343, md: 400 }}
              className='!border-second !border-w-1 focus:!border-none !outline-none'
              key={form.key('password')}
              {...form.getInputProps('password')}
              classNames={{
                input: '!text-sm',
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
          <Group wrap='nowrap' align='center' w={'100%'}>
            <Divider h={1} bg={'#DFDEDC'} w={'100%'} flex={1} />
            <Text mx={8} fw={400} c={'#817C74'}>
              أو
            </Text>
            <Divider h={1} bg={'#DFDEDC'} w={'100%'} flex={1} />
          </Group>

          <ActionIcon className='!bg-transparent !w-fit'>
            <Text
              fw={500}
              fz={16}
              className='!text-primary hover:!cursor-pointer'
              onClick={() =>
                userType == USER_TYPE.DISPLACED
                  ? setUserType(USER_TYPE.DELEGATE) //DELEGATE | MANAGER | SECRETARY | SECURITY_OFFICER
                  : setUserType(USER_TYPE.DISPLACED)
              }
            >
              {userType == USER_TYPE.DISPLACED
                ? ' تسجيل الدخول كنازح ؟ '
                : 'تسجيل الدخول كموظف ؟'}
            </Text>
          </ActionIcon>
        </Stack>
      </Stack>
    </>
  );
}
