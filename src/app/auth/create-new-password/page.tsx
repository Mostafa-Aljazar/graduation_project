'use client';
import React, { useState } from 'react';
import {
  Button,
  Stack,
  Text,
  PasswordInput,
  LoadingOverlay,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { toFormData } from '@/utils/objectToFormData';
import { AUTH_ROUTES } from '@/constants/routes';
import { useQueryStates, parseAsString } from 'nuqs';
import createNewPasswordResponse from '@/@types/auth/createNewPasswordResponse';
import { createNewPassword } from '@/actions/auth/createNewPassword';
import {
  createNewPasswordSchema,
  createNewPasswordType,
} from '@/validation/auth/createNewPasswordSchema';

export default function Create_New_Password() {
  const [error, setError] = useState('');
  const router = useRouter();

  // Form state with better validation
  const form = useForm<createNewPasswordType>({
    mode: 'uncontrolled',
    initialValues: { password: '', confirm_password: '' },
    validate: zodResolver(createNewPasswordSchema),
  });

  // Query states => will be used to get email
  const [query, setQuery] = useQueryStates(
    { email: parseAsString.withDefault('') },
    { shallow: true }
  );

  const createNewPasswordMutation = useMutation<
    createNewPasswordResponse,
    Error,
    FormData
  >({
    mutationFn: createNewPassword,
    onSuccess: (data) => {
      console.log('🚀 ~ Create_New_Password ~ data:', data);
      if (Number(data.status) == 200) {
        notifications.show({
          title: data.message,
          message: 'تم تحديث كلمة المرور بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
          loading: true,
        });

        router.push(AUTH_ROUTES.LOGIN);
        form.reset();
      } else {
        throw new Error(data.error || 'فشل في تحديث كلمة المرور');
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

  const handleSubmit = form.onSubmit((values: createNewPasswordType) => {
    try {
      const formData = toFormData({
        password: values.password,
        email: query.email,
      });
      createNewPasswordMutation.mutate(formData);
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
          إنشاء كلمة مرور جديدة
        </Text>

        <Stack justify='center' align='center' gap={20}>
          <Text
            fw={400}
            fz={14}
            c={'#817C74'}
            ta={'center'}
            w={{ base: 343, md: 400 }}
          >
            أدخل كلمة المرور الجديدة وتأكيدها
          </Text>

          <form
            className='!relative !flex flex-col items-center gap-0'
            onSubmit={handleSubmit}
          >
            {/* Loading Overlay */}
            <LoadingOverlay
              visible={createNewPasswordMutation.isPending}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 0.3 }}
            />
            <PasswordInput
              type='password'
              label={
                <Text fw={400} c={'#817C74'} fz={16}>
                  كلمة المرور الجديدة
                </Text>
              }
              placeholder={'ادخل كلمة المرور الجديدة'}
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

            {/* Confirm Password */}
            <PasswordInput
              type='password'
              label={
                <Text fw={400} c={'#817C74'} fz={16}>
                  تأكيد كلمة المرور
                </Text>
              }
              placeholder={'ادخل تأكيد كلمة المرور'}
              w={{ base: 343, md: 400 }}
              mt={20}
              className='!border-second !border-w-1 focus:!border-none !outline-none'
              key={form.key('confirm_password')}
              {...form.getInputProps('confirm_password')}
              classNames={{
                input: '!text-sm',
                error:
                  '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
              }}
            />

            <Button
              loading={createNewPasswordMutation.isPending}
              type='submit'
              mt={32}
              fz={20}
              fw={500}
              w={228}
              c={'white'}
              className={`!shadow-lg max-lg:!mt-10 ${
                !form.getValues().password || !form.getValues().confirm_password
                  ? '!bg-primary/70'
                  : '!bg-primary'
              }`}
              disabled={
                !form.getValues().password || !form.getValues().confirm_password
              }
            >
              حفظ
            </Button>

            {error && (
              <Text fw={500} mt={'sm'} size='sm' ta='center' c='red'>
                {error}
              </Text>
            )}
          </form>
        </Stack>
      </Stack>
    </>
  );
}
