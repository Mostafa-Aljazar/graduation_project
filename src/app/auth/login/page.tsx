'use client';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Loader,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { AUTH_ROUTES, ROUTES } from '@/content/routes';
import Link from 'next/link';
import { loginSchema, loginType } from '@/validation/loginSchema';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/actions/login';
import loginResponse from '@/@types/loginResponse.type';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { toFormData } from '@/utility/objectToFormData';

export const USER_TYPE = {
  DISPLACED: 'DISPLACED',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export default function Login() {
  // Define the form schema
  const form = useForm<loginType>({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: zodResolver(loginSchema),
  });

  const [userType, setUserType] = useState<keyof typeof USER_TYPE>(
    USER_TYPE.DISPLACED
  );
  console.log('🚀 ~ Login ~ userType:', userType);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginMutation = useMutation<loginResponse, Error, FormData>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('🚀 ~ Login ~ data:', data);
      notifications.show({
        title: 'Message : ',
        message:
          Number(data.status) == 200
            ? 'Hi !'
            : String(data.status) == '500'
            ? 'Check your internet'
            : 'Failed to login',
        color: data.error ? 'red' : 'grape',
        position: 'top-left',
        withBorder: true,
        loading: Number(data.status) == 200,
      });
      if (!data.error) {
        // TODO: chang route to user profile
        // router.push(ROUTES.HOME);
        form.reset();
      }
      setLoading(false);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Failed to login';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
      setLoading(false);
    },
  });

  const handleSubmit = form.onSubmit((data: loginType) => {
    setLoading(true);

    try {
      console.log('🚀 ~ handleSubmit ~ data:', data);

      const formData = toFormData({
        ...data,
        userType,
      });
      console.log('🚀 ~ handleSubmit ~ formData:', formData);

      loginMutation.mutate(formData);
    } catch (error: any) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      setError(error?.message as string);
    }
  });

  if (loading) {
    return (
      <Loader
        mx={'auto'}
        className='!mt-[200px]'
        size={'lg'}
        color={'primary'}
      />
    );
  }

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
            className='flex flex-col items-center gap-0'
            onSubmit={handleSubmit}
          >
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
              loading={form.submitting}
              type='submit'
              mt={32}
              fz={20}
              fw={500}
              c={'white'}
              className={'!shadow-lg max-lg:!mt-10 !bg-primary'}
              w={228}
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
                  ? setUserType(USER_TYPE.EMPLOYEE)
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
