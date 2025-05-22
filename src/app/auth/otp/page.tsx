'use client';
import React, { useState, useEffect, Suspense } from 'react';
import {
  Button,
  PinInput,
  Stack,
  Text,
  Group,
  LoadingOverlay,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { verifyOtp, verifyOtpProps } from '@/actions/auth/verifyOtp';
import verifyOtpResponse from '@/@types/auth/verifyOtpResponse.type';
import {
  forgetPassword,
  forgetPasswordProps,
} from '@/actions/auth/forgetPassword';
import forgetPasswordResponse from '@/@types/auth/forgetPasswordResponse.type';
import { AUTH_ROUTES } from '@/constants/routes';
import { otpSchema, otpType } from '@/validation/auth/otpSchema';

export default function OTP() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPContent />
    </Suspense>
  );
}

function OTPContent() {
  const router = useRouter();

  // Query states => will be used to get email, callback and date from url
  const [query, setQuery] = useQueryStates(
    {
      email: parseAsString.withDefault(''),
      callback: parseAsString.withDefault('/'), // will be used to redirect to the page after verifying the OTP
      date: parseAsInteger.withDefault(Date.now()), // will be used to calculate the time remaining for the OTP to expire
    },
    { shallow: true }
  );

  useEffect(() => {
    if (!query.email || !query.callback || !query.date) {
      router.push(AUTH_ROUTES.LOGIN);
    }
  }, []);

  // Timer state
  const [seconds, setSeconds] = useState(() =>
    Math.max(60 - Math.floor((Date.now() - query.date) / 1000), 0)
  );

  // Timer effect with better handling
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  // Time formatting with better display
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;

  const [error, setError] = useState('');

  // Form state with better validation
  const form = useForm<otpType>({
    mode: 'uncontrolled',
    initialValues: { otp: '' },
    validate: zodResolver(otpSchema),
  });

  // Verify OTP mutation with better error handling
  const verifyOtpMutation = useMutation<
    verifyOtpResponse,
    Error,
    verifyOtpProps
  >({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      if (Number(data.status) == 200) {
        notifications.show({
          title: data.message || 'تم التحقق من الرمز بنجاح',
          message: 'قم بتعيين كلمة مرور جديدة',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
          loading: true,
        });

        router.push(`${query.callback}?email=${query.email}`); // redirect to the callback url
        form.reset();
        setError('');
        return;
      } else {
        const errorMessage = data.error || 'رمز التحقق غير صالح';
        setError(errorMessage);
        throw new Error(errorMessage);
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

  // Handle submit with better validation
  const handleSubmit = form.onSubmit((values: otpType) => {
    try {
      if (!seconds) {
        setError('انتهى وقت الرمز. يرجى طلب رمز جديد');
        return;
      }
      if (values.otp.length !== 4) {
        setError('يجب إدخال 4 أرقام');
        return;
      }

      setError('');
      verifyOtpMutation.mutate({ email: query.email, otp: values.otp });
    } catch (error: any) {
      setError(error?.message as string);
    }
  });

  // Resend OTP mutation with better handling
  const resendOtpMutation = useMutation<
    forgetPasswordResponse,
    Error,
    forgetPasswordProps
  >({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      if (Number(data.status) == 200) {
        notifications.show({
          title: 'تم اعادة إرسال رمز التحقق إلى بريدك الإلكتروني',
          message: ' قم بالتحقق من بريدك الإلكتروني مرة أخرى',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
          loading: true,
        });

        const newDate = Date.now();
        setQuery({ date: newDate });
        setSeconds(60);
        form.reset();
        setError('');
      } else {
        const errorMessage =
          data.error || 'فشل في إرسال رمز التحقق إلى بريدك الإلكتروني';
        setError(errorMessage);
        throw new Error(errorMessage);
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

  // Handle resend with better UX
  const handleResend = async () => {
    setError('');
    resendOtpMutation.mutate({ email: query.email });
  };

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
          إدخال رمز التحقق
        </Text>

        <Stack justify='center' align='center' gap={20}>
          <Text
            fw={500}
            fz={16}
            c={'#817C74'}
            ta={'center'}
            w={{ base: 343, md: 400 }}
          >
            لقد أرسلنا رمز التحقق إلى
            <span className='font-bold'>{query.email}</span>
          </Text>

          <form
            className='!relative flex flex-col items-center gap-0'
            onSubmit={handleSubmit}
          >
            <LoadingOverlay
              visible={
                verifyOtpMutation.isPending || resendOtpMutation.isPending
              }
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 0.3 }}
            />

            <PinInput
              disabled={
                verifyOtpMutation.isPending ||
                resendOtpMutation.isPending ||
                seconds === 0
              }
              type='number'
              size='md'
              length={4}
              placeholder=''
              classNames={{
                root: 'gap-5',
                input:
                  'border-1 border-[#DFDEDC] w-12 h-12 rounded-lg focus:border-primary',
              }}
              key={form.key('otp')}
              {...form.getInputProps('otp')}
              autoFocus
            />

            {!seconds && (
              <Text fw={500} fz={16} c={'#FD6265'} ta={'center'} mt={'sm'}>
                انتهى وقت الرمز
              </Text>
            )}

            {seconds > 0 && (
              <Group
                align='center'
                justify='center'
                mt={20}
                className='px-2 py-1 border-[#5F6F52] border-1 rounded-lg'
                c={'#5F6F52'}
              >
                <Timer size={16} />
                <Text fw={400} fz={14}>
                  {timeDisplay}
                </Text>
              </Group>
            )}

            {!seconds && (
              <Button
                variant='transparent'
                mt={20}
                fz={16}
                fw={500}
                onClick={handleResend}
                disabled={resendOtpMutation.isPending}
                // loading={resendOtpMutation.isPending}
                className='!text-primary hover:!text-primary/80 !underline'
              >
                إعادة إرسال الرمز
              </Button>
            )}

            <Button
              // loading={verifyOtpMutation.isPending}
              type='submit'
              mt={32}
              fz={20}
              fw={500}
              c={'white'}
              className={`!shadow-lg max-lg:!mt-10 ${
                !seconds || form.getValues().otp.length !== 4
                  ? '!bg-primary/70'
                  : '!bg-primary hover:!bg-primary/90'
              }`}
              w={228}
              disabled={
                !seconds ||
                form.getValues().otp.length !== 4 ||
                verifyOtpMutation.isPending
              }
            >
              تحقق
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
